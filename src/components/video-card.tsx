'use client';
import { Card, CardContent } from './ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from './progress';
import { Button } from './ui/button';
import { CheckCircle, Clock, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function VideoCard({
  courseId,
  video,
}: {
  courseId: string;
  video: any;
}) {
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

  return (
    <Card className="group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:max-w-screen-sm">
      <CardContent className="p-0">
        {/* Video Thumbnail Header */}
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            {video.thumbnailURL ? (
              <img
                src={video.thumbnailURL || '/placeholder.svg'}
                alt={`Day ${video.dayNumber}: ${video.title}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {/* Play button overlay */}
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 hover:opacity-100"
              onClick={() => {
                router.push(
                  `/courses/watch/${courseId}/${video.id}?vid=${video.vimeoId}`,
                );
              }}
            >
              <div className="scale-90 rounded-full bg-white bg-opacity-90 p-4 transition-transform duration-300 group-hover:scale-100">
                <Play className="h-8 w-8 text-gray-800" />
              </div>
            </div>
            {/* Day number badge */}
            <div className="absolute left-4 top-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white shadow-lg shadow-green-600/30 ring-2 ring-white/60">
                {video.dayNumber}
              </div>
            </div>
            {/* Duration badge */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center rounded-full bg-black bg-opacity-70 px-3 py-1 text-xs text-white backdrop-blur-sm">
                <Clock className="mr-1 h-3 w-3" />
                {video.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="mb-2 text-lg font-semibold text-[#003C2F]">
              {video.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-600">
              {video.description}
            </p>
          </div>

          {video.lastWatched && (
            <div className="mb-3 text-sm text-gray-500">
              Last watched: {formatDate(video.lastWatched)}
            </div>
          )}

          {/* Progress Bar */}
          {video.progress > 0 && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-700">
                  {video.progress}%
                </span>
              </div>
              <Progress value={video.progress} className="h-2" />
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              className="rounded-full bg-green-600 hover:bg-green-700"
              onClick={() => {
                router.push(
                  `/courses/watch/${courseId}/${video.id}?vid=${video.vimeoId}`,
                );
              }}
            >
              <Play className="mr-2 h-4 w-4" />
              {video.progress > 0 ? 'Continue' : 'Start'} Watching
            </Button>
            {video.completed && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
