import CourseVideos from '@/components/course-videos';

export default async function Page({
  params,
}: {
  params: Promise<{
    courseId: string;
  }>;
}) {
  const {courseId} = await params;
  return (
    <>
      <CourseVideos courseId={courseId} />
    </>
  );
}
