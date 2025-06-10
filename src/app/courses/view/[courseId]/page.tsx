import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { CourseView } from '@/components/course-view';

export default function Page({ params }: { params: { courseId: string } }) {
  return (
    <>
      <CourseView courseId={params.courseId} />
      <TermsAndConditions />
    </>
  );
}
