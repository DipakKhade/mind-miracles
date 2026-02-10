import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { CourseView } from '@/components/course-view';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const {courseId} = await params;
  const session = await getServerSession(authOptions);
  return (
    <>
      <CourseView courseId={courseId} />
      {session && <TermsAndConditions />}
    </>
  );
}
