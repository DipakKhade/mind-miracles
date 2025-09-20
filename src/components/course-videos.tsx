'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, CheckCircle, Calendar, Users } from 'lucide-react';
import { Progress } from './progress';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';
import { validateUserForVideo } from '@/actions/courses';
import { VideoCard } from './video-card';
import Loading from '@/app/purchases/loading';
import { getCourseProgress } from '@/actions/progress';

export default function CourseVideos({ courseId }: { courseId: string }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [courseData, setCourseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        toast.loading('loading', {
          position: 'top-center'
        })
        setIsLoading(true);
        setError(null);

        const session = await getSession();
        if (!session) {
          router.push('/');
          toast.warning('Sign in to your account');
          return;
        }

        if (session.user?.email) {
          const validateUser = await validateUserForVideo(
            session.user.email,
            courseId,
          );
          if (!validateUser) {
            toast.warning('Unauthorized user');
            router.push(`/courses/view/${courseId}`);
            return;
          }
        }

        const response = await fetch(`/api/course/${courseId}/vedios`);

        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }

        const data = await response.json();
        setCourseData(data);
        setVideos(data?.video || []);

        const currentCourceProgress = await getCourseProgress(courseId);
        setProgress(currentCourceProgress);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error initializing course videos:', err);
        toast.error('Failed to load course data');
      } finally {
        toast.dismiss()
        setIsLoading(false);
      }
    };

    if (courseId) {
      initializeComponent();
    }
  }, [courseId, router]);

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

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
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
          <div className="py-12 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-red-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Error loading course
            </h3>
            <p className="mb-6 text-gray-600">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                      {/* <p className="mb-4 text-gray-600">
                        {courseData.description}
                      </p> */}
                    </div>
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
                        {progress ?? 0}%
                      </span>
                    </div>
                    <Progress value={progress ?? 0} className="h-2" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.length > 0 ? (
              videos.map((video) => {
                return (
                  <VideoCard courseId={courseId} video={video} key={video.id} />
                );
              })
            ) : (
              <div className="py-12 text-center">
                <Play className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No videos available
                </h3>
                <p className="text-gray-600">
                  This course doesn&apos;t have any videos yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
