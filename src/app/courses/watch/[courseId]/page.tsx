import CourseVideos from '@/components/course-videos';

export default function Page({ params }: {
  params: {
    courseId: string;
  };
}) {
  return (
    <>
      <CourseVideos courseId={params.courseId} />
    </>
  );
}
