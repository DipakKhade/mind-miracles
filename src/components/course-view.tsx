'use client';

import { getCourseById } from '@/actions/courses';
import { useEffect, useState } from 'react';
import { ProgramInfo } from '@/components/ProgramInfo';
import { VideoPreview } from '@/components/7-days-program/VideoPreview';
import { FeeInfo } from '@/components/common/fee-info';
import { ProgramRegistrationForm } from '@/components/common/program-registration';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GoogleSignInButton } from './google-signin-button';
import { signIn, useSession } from 'next-auth/react';
import { CourseViewSkeleton } from './skeletons/view-score-skeleton';

export function CourseView({ courseId }: { courseId: string }) {
  const [courseData, setCourseData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    async function getCourseData() {
      try {
        const data = await getCourseById(courseId);
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course. Please try again.', {
          position: 'top-center',
        });
      } finally {
        setIsLoading(false);
      }
    }
    getCourseData();
  }, [courseId]);

  return (
    <>
      {isLoading ? (
        <CourseViewSkeleton />
      ) : (
        <div>
          <header className="sticky top-16 z-40 border-b border-gray-200 bg-white/85 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-gray-600 hover:bg-green-50 hover:text-green-700"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to courses
                  </Button>
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Mindmiracles
                </div>
              </div>
            </div>
          </header>
          {/* <div className="flex items-center justify-between">
        <CourseTitle courseTitle={courseData?.title ?? ''} />
      </div> */}
          <ProgramInfo
            courseDescription={courseData?.description ?? ''}
            courseFeatures={courseData?.courseFeature ?? []}
          />
          {courseData?.previewURL && (
            <VideoPreview videolink={courseData?.previewURL ?? ''} />
          )}

          {courseData?.price && <FeeInfo feeAmount={courseData?.price ?? 0} />}

          {status === 'loading' ? (
            <div className="flex w-full justify-center py-8">
              <div className="w-96 space-y-4">
                <CourseViewSkeleton />
              </div>
            </div>
          ) : status === 'unauthenticated' ? (
            <section className="px-4 pb-16 pt-4">
              <div className="mx-auto max-w-md">
                <div className="rounded-3xl border border-green-100 bg-white p-8 text-center shadow-xl shadow-green-900/5">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-600/10">
                    <svg
                      className="h-7 w-7 text-green-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#003C2F]">
                    Sign in to Join
                  </h3>
                  <p className="mt-2 text-sm text-[#003C2F]/60">
                    Sign in with Google to enroll in this program and start your
                    journey with Mind Miracles.
                  </p>
                  <div className="mt-6">
                    <GoogleSignInButton
                      onClick={() => {
                        signIn('google');
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <ProgramRegistrationForm
              course_id={courseId}
              amount_to_pay={courseData?.price ?? 0}
            />
          )}
        </div>
      )}
    </>
  );
}
