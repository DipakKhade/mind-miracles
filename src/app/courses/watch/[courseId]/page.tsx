import CourseVideos from '@/components/course-videos';
import { VideoList } from '@/components/video-list';

export default function Page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  return (
    <>
      {/* <VideoList courseId={params.courseId} /> */}
      <CourseVideos courseId={params.courseId}/>
    </>
  );
}
