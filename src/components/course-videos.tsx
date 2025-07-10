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
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';
import { validateUserForVideo } from '@/actions/courses';
import { VideoCard } from './video-card';
import Loading from '@/app/purchases/loading';

export default function CourseVideos({ courseId }: { courseId: string }) {
  const [videos, setVedios] = useState<any[]>();
  const [courseData, setCourseData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const session = await getSession();
      if (!session) {
        router.push('/');
        toast.warning('sign to your account');
      } else if (session && session.user?.email) {
        const validateUser = await validateUserForVideo(
          session.user?.email,
          courseId,
        );
        if (!validateUser) {
          toast.warning('/unAuthenticated user');
          router.push(`/courses/view/${courseId}`);
        }
      }
    })();
    setIsLoading(false);
  }, [courseId]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetch(`/api/course/${courseId}/vedios`);
      const response = await res.json();
      setCourseData(response);
      setVedios(response?.video);
    })();
    setIsLoading(false);
  }, [courseId]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not started';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getVideoStatus = (video: any) => {
    if (video.completed) return 'completed';
    if (video.progress > 0) return 'in-progress';
    return 'not-started';
  };

  if(isLoading) return <Loading />

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
                  {/* <img
                    src={courseData.thumbnailURL || '/placeholder.svg'}
                    alt={courseData.title}
                    className="h-40 w-full rounded-lg object-cover lg:w-64"
                  /> */}
                  <video
                    className="h-40 w-full rounded-lg object-cover lg:w-64"
                    width="100%"
                    height="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={courseData.thumbnailURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
                    {/* <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      ₹{courseData.price}
                    </Badge> */}
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      Enrolled: {formatDate(courseData.enrolledAt)}
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
                  <VideoCard courseId={courseId} video={video} key={video.id} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
