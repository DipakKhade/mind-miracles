'use client';

import { getCourseById } from '@/actions/courses';
import { use, useEffect, useState } from 'react';
import { ProgramInfo } from '@/components/ProgramInfo';
import { VideoPreview } from '@/components/7-days-program/VideoPreview';
import { FeeInfo } from '@/components/common/fee-info';
import { ProgramRegistrationForm } from '@/components/common/program-registration';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/purchases/loading';

export function CourseView({ courseId }: { courseId: string }) {
  const [courseData, setCourseData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    async function getCourseData() {
      const data = await getCourseById(courseId);
      setCourseData(data);
    }
    getCourseData();
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to courses
                </Button>
              </div>
              <div className="text-sm text-gray-500">Mindmiracles</div>
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

        <ProgramRegistrationForm
          course_id={courseId}
          amount_to_pay={courseData?.price ?? 0}
        />
      </div>
    </>
  );
}
