'use client';

import { getCourseById } from '@/actions/courses';
import { useEffect, useState } from 'react';
import { ProgramInfo } from '@/components/7-days-program/ProgramInfo';
import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { VideoPreview } from '@/components/7-days-program/VideoPreview';
import { FeeInfo } from '@/components/common/fee-info';
import { ProgramRegistrationForm } from '@/components/common/program-registration';
import Hero from '@/components/Hero';
import { courses } from '@/types';

type CourseViewProps =
  | ({
      courseFeature: {
        feature: string;
      }[];
    } & {
      id: string;
      title: string;
      description: string;
      price: number;
      previewURL: string | null;
      createdAt: Date;
      updatedAt: Date;
      isActive: boolean;
      isPaid: boolean;
    })
  | null;

export function CourseView({ courseId }: { courseId: string }) {
  const [courseData, setCourseData] = useState<CourseViewProps | null>(null);
  useEffect(() => {
    async function getCourseData() {
      const data = await getCourseById(courseId);
      console.log(data);
      setCourseData(data);
    }
    getCourseData();
  }, []);
  return (
    <>
      <div>
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
