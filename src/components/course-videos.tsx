'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  Calendar,
  Users,
} from 'lucide-react';
import { Progress } from './progress';
import { useRouter } from 'next/navigation';

// Mock data based on your schema structure
const courseData = {
  id: 'course-1',
  title: 'Personal Counselling',
  description:
    'Transform your life with our comprehensive program designed to help you achieve your full potential',
  price: 99,
  thumbnailURL: '/placeholder.svg?height=200&width=400',
  enrolledAt: 'June 21, 2025',
  overallProgress: 65,
  totalVideos: 8,
  completedVideos: 5,
};

const videosData = [
  {
    id: 'video-1',
    title: 'Introduction to Personal Development',
    description:
      'Learn the fundamentals of personal growth and self-improvement',
    dayNumber: 1,
    progress: 100,
    completed: true,
    lastWatched: '2025-06-22T10:30:00Z',
    duration: '15:30',
  },
  {
    id: 'video-2',
    title: 'Understanding Your Mindset',
    description: 'Explore the power of mindset and how it shapes your reality',
    dayNumber: 2,
    progress: 100,
    completed: true,
    lastWatched: '2025-06-23T14:15:00Z',
    duration: '22:45',
  },
  {
    id: 'video-3',
    title: 'Goal Setting Strategies',
    description: 'Master the art of setting and achieving meaningful goals',
    dayNumber: 3,
    progress: 100,
    completed: true,
    lastWatched: '2025-06-24T09:20:00Z',
    duration: '18:20',
  },
  {
    id: 'video-4',
    title: 'Overcoming Limiting Beliefs',
    description: 'Identify and break through the beliefs that hold you back',
    dayNumber: 4,
    progress: 75,
    completed: false,
    lastWatched: '2025-06-25T16:45:00Z',
    duration: '25:10',
  },
  {
    id: 'video-5',
    title: 'Building Confidence',
    description: 'Develop unshakeable confidence in all areas of your life',
    dayNumber: 5,
    progress: 45,
    completed: false,
    lastWatched: '2025-06-26T11:30:00Z',
    duration: '20:15',
  },
  {
    id: 'video-6',
    title: 'Emotional Intelligence',
    description: 'Master your emotions and improve your relationships',
    dayNumber: 6,
    progress: 0,
    completed: false,
    lastWatched: null,
    duration: '28:30',
  },
  {
    id: 'video-7',
    title: 'Creating Positive Habits',
    description: 'Build lasting habits that support your personal growth',
    dayNumber: 7,
    progress: 0,
    completed: false,
    lastWatched: null,
    duration: '19:45',
  },
  {
    id: 'video-8',
    title: 'Maintaining Your Progress',
    description: 'Learn how to sustain your growth and continue improving',
    dayNumber: 8,
    progress: 0,
    completed: false,
    lastWatched: null,
    duration: '16:20',
  },
];

export default function CourseVideos({ courseId }: { courseId: string }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [course, setCourse] = useState();
  const [videos, setVedios] = useState<any[]>();

  const [courseData, setCourseData] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/course/${courseId}/vedios`);
      const response = await res.json();
      setCourseData(response);
      setVedios(response?.video);
    })();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not started';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getVideoStatus = (video: (typeof videosData)[0]) => {
    if (video.completed) return 'completed';
    if (video.progress > 0) return 'in-progress';
    return 'not-started';
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => router.push('/purchases')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Purchases
              </Button>
            </div>
            <div className="text-sm text-gray-500">Mindmiracles</div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Course Header */}
        {courseData && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-shrink-0">
                  <img
                    src={courseData.thumbnailURL || '/placeholder.svg'}
                    alt={courseData.title}
                    className="h-40 w-full rounded-lg object-cover lg:w-64"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h1 className="mb-2 text-2xl font-bold text-gray-900">
                        {courseData.title}
                      </h1>
                      <p className="mb-4 text-gray-600">
                        {courseData.description}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      ₹{courseData.price}
                    </Badge>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      Enrolled: {courseData.enrolledAt}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      {courseData.totalVideos} Videos
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {courseData?.completedVideos}/{courseData?.totalVideos}{' '}
                      Completed
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium text-gray-900">
                        {courseData.overallProgress}%
                      </span>
                    </div>
                    <Progress
                      value={courseData.overallProgress}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Course Videos
            </h2>
            <div className="text-sm text-gray-500">
              {courseData?.completedVideos} of {courseData?.totalVideos}{' '}
              completed
            </div>
          </div>

          <div className="grid gap-4">
            {videos &&
              videos.map((video) => {
                const status = getVideoStatus(video);
                return (
                  <Card
                    key={video.id}
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
                                setSelectedVideo(video.id)
                                router.push(`/courses/watch/${courseId}/${video.vimeoId}`)
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
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
