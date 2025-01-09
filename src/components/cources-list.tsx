"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const courses = [
  {
    title: "7 Days Life Changing Program",
    description:
      "Transform your life with our comprehensive program designed to help you achieve your full potential",
    features: [
      "Develop powerful mindset strategies",
      "Create lasting positive habits",
      "Master emotional intelligence",
      "Build effective communication skills",
      "Learn stress management techniques",
    ],
    link: "/cources/7-days-program",
  },
  {
    title: "Personal Counselling",
    description:
      "One-on-one guidance to help you overcome challenges and achieve personal growth",
    features: [
      "Personalized attention and support",
      "Confidential environment",
      "Flexible scheduling",
      "Expert guidance",
      "Tailored strategies for growth",
    ],
    link: "/cources/personal-counselling",
  },
];

export default function CoursesList() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600">
            Choose the right program for your journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-lg">
              <div className="h-48 bg-green-700 flex items-center justify-center p-6">
                <h2 className="text-3xl font-bold text-white text-center">
                  {course.title}
                </h2>
              </div>

              <CardHeader>
                <CardDescription className="text-lg text-gray-600">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    What you&apos;ll learn:
                  </h3>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="h-6 w-6 text-[#407A45] mr-2"
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
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={course.link}>
                    <Button className="w-full mt-6 bg-green-700 hover:bg-[#2f5a32] text-white">
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
