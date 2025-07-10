'use client';

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from '@/components/ui/badge';
import { Progress } from "./progress";
import { Button } from "./ui/button";
import { CheckCircle, Clock, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function VideoCard({ courseId, video }: { courseId: string, video: any }) {
    const [status, setStatus] = useState<string>('not-started');

    const router = useRouter();

    const getStatusColor = (status: string) => {
        switch (status) {
          case 'completed':
            return 'bg-green-100 text-green-800 border-green-200';
          case 'in-progress':
            return 'bg-blue-100 text-blue-800 border-blue-200';
          default:
            return 'bg-gray-100 text-gray-600 border-gray-200';
        }
      };

      const getStatusText = (status: string) => {
        switch (status) {
          case 'completed':
            return 'Completed';
          case 'in-progress':
            return 'In Progress';
          default:
            return 'Not Started';
        }
      };

      const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not started';
        return new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      };


    return <>
         <Card
                    className="transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Day Number */}
                        <div className="flex-shrink-0">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-green-100 font-semibold text-green-800">
                              {video.dayNumber}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Video Info */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="mb-1 text-lg font-medium text-gray-900">
                                Day {video.dayNumber}: {video.title}
                              </h3>
                              <p className="mb-2 text-sm text-gray-600">
                                {video.description}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={getStatusColor(status)}
                            >
                              {getStatusText(status)}
                            </Badge>
                          </div>

                          <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {video.duration}
                            </div>
                            {video.lastWatched && (
                              <div>
                                Last watched: {formatDate(video.lastWatched)}
                              </div>
                            )}
                          </div>

                          {/* Progress Bar */}
                          {video.progress > 0 && (
                            <div className="mb-4 space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-medium text-gray-700">
                                  {video.progress}%
                                </span>
                              </div>
                              <Progress
                                value={video.progress}
                                className="h-1.5"
                              />
                            </div>
                          )}

                          {/* Action Button */}
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                router.push(
                                  `/courses/watch/${courseId}/${video.id}?vid=${video.vimeoId}`,
                                );
                              }}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              {video.progress > 0 ? 'Continue' : 'Start'}{' '}
                              Watching
                            </Button>
                            {video.completed && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
    </>
}