'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCourses } from '@/actions/courses';
import { Course } from '@/types';
import Loading from '@/app/purchases/loading';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { CheckCircle2, PlayCircle } from 'lucide-react';

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'loading') return;
    toast.loading('loading...', {
      position: 'top-center',
    });
    setLoading(true);
    async function getCoursesData() {
      const data = await getCourses(session?.user?.email || '');
      //@ts-ignore
      setCourses(data);
      toast.dismiss();
    }
    getCoursesData();
    setLoading(false);
  }, [session, status]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="inline-flex items-center rounded-full border border-green-600/20 bg-green-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
                Learn & Grow
              </span>
              <h1 className="mb-3 mt-4 text-4xl font-bold text-[#003C2F]">
                Our Programs
              </h1>
              <p className="text-lg text-[#003C2F]/60">
                Choose the right program for your journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {courses &&
                courses.map((course: any, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-green-900/15"
                  >
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-green-700">
                      <video
                        className="h-full w-full object-cover"
                        width="100%"
                        height="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={course.thumbnailURL} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <PlayCircle className="absolute h-16 w-16 text-white opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                    </div>

                    <CardHeader className="pt-6">
                      <CardDescription className="text-lg text-gray-600">
                        <h2 className="text-center text-3xl font-bold text-[#003C2F]">
                          {course.title}
                        </h2>
                        <p className="mt-2 text-center">{course.description}</p>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#003C2F]">
                          What This 7-Day Program Can Do for You
                        </h3>
                        <ul className="space-y-2.5">
                          {course?.courseFeature &&
                            course?.courseFeature.length &&
                            course.courseFeature.map(
                              (feature: any, idx: any) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5"
                                >
                                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                                  <span className="text-gray-700">
                                    {feature.feature}
                                  </span>
                                </li>
                              ),
                            )}
                        </ul>
                        <Link
                          href={
                            course.enrollments.length > 0
                              ? `courses/watch/${course.id}`
                              : `/courses/view/${course.id}`
                          }
                        >
                          <Button className="mt-4 w-full rounded-full bg-green-600 py-6 text-base text-white shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl">
                            {course.enrollments.length > 0
                              ? 'Continue Learning'
                              : 'Enroll Now'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
