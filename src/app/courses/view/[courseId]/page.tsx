import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { CourseView } from '@/components/course-view';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error('Session error:', error);
  }
  return (
    <>
      <CourseView courseId={courseId} />
      {session?.user && <TermsAndConditions />}
    </>
  );
}
