import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { CourseView } from '@/components/course-view';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <CourseView courseId={params.courseId} />
      {session && <TermsAndConditions />}
    </>
  );
}
