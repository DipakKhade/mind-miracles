'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { getCourses } from '@/actions/courses';
import { Course } from '@/types';

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function getCoursesData() {
      const data = await getCourses();
      //@ts-ignore
      setCourses(data);
    }
    getCoursesData();
  }, []);
  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Courses</h1>
          <p className="text-xl text-gray-600">
            Choose the right program for your journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {courses &&
            courses.map((course, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg">
                <div className="flex h-48 items-center justify-center bg-green-700">
                  <img
                    src={course.thumbnailURL}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <CardHeader>
                  <CardDescription className="text-lg text-gray-600">
                    <h2 className="p-2 text-center text-3xl font-bold">
                      {course.title}
                    </h2>
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      What you&apos;ll learn:
                    </h3>
                    <ul className="space-y-2">
                      {course?.courseFeature &&
                        course?.courseFeature.length &&
                        course.courseFeature.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="mr-2 h-6 w-6 text-[#407A45]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-700">
                              {feature.feature}
                            </span>
                          </li>
                        ))}
                    </ul>
                    <Link href={`/courses/view/${course.id}`}>
                      <Button className="mt-6 w-full bg-green-700 text-white hover:bg-[#2f5a32]">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
