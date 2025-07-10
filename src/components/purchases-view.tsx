'use client';
import { BookOpen } from 'lucide-react';
import { Link } from 'lucide-react';
import { Button } from './ui/button';
import { CourseCard } from './course-card';
import { PurchasesDetails } from './purchases-details';
import { useEffect, useState } from 'react';
import Loading from '@/app/purchases/loading';

export default function PurchasesView() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/purchase/courses')
      .then((res) => res.json())
      .then((data) => {
        setEnrolledCourses(data);
      });
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />

  return (
    <>
      <PurchasesDetails enrolledCourseslength={enrolledCourses.length} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((enrollment) => (
            <CourseCard
              key={enrollment.id}
              course={enrollment.course}
              enrolledAt={enrollment.enrolledAt}
            />
          ))}
        </div>

        {enrolledCourses.length === 0 && (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No courses yet
            </h3>
            <p className="mb-6 text-gray-600">
              Start your learning journey by enrolling in a course
            </p>
            <Link href="/courses">
              <Button className="bg-green-600 hover:bg-green-700">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
