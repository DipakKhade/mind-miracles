'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { BookOpen, GraduationCap, Mail, User } from 'lucide-react';
import { CourseCard } from './course-card';
import { GoBack } from './go-back';
import Loading from '@/app/purchases/loading';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

export default function ProfileView() {
  const { data: session, status } = useSession();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated') {
      const fetchCourses = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch('/api/purchase/courses');
          if (!response.ok) {
            throw new Error('Failed to fetch courses');
          }
          const data = await response.json();
          setEnrolledCourses(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };
      fetchCourses();
    } else {
      setIsLoading(false);
    }
  }, [status]);

  const user = session?.user;
  const userInitial = (user?.name ?? user?.email ?? '?')
    .charAt(0)
    .toUpperCase();

  if (status === 'loading') return <Loading />;

  if (status === 'unauthenticated') {
    return (
      <>
        <GoBack backTo="Home" backToRoute="" />
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-green-100 bg-white p-10 text-center shadow-xl shadow-green-900/5">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#003C2F]">
              Sign in to view your profile
            </h1>
            <p className="mt-2 text-[#003C2F]/60">
              Sign in with Google to see your account details and purchased
              courses.
            </p>
            <Button
              onClick={() => signIn('google')}
              className="mt-6 rounded-full bg-green-600 px-8 py-6 shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
            >
              Sign In with Google
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <GoBack backTo="Home" backToRoute="" />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-green-600 to-teal-700" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              {user?.image ? (
                <img
                  alt={`${user.name ?? 'User'} avatar`}
                  src={user.image}
                  className="h-20 w-20 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-teal-700 text-3xl font-bold text-white shadow-lg ring-4 ring-white">
                  {userInitial}
                </span>
              )}
              <div className="pb-1">
                <h1 className="text-2xl font-bold text-[#003C2F]">
                  {user?.name ?? 'User'}
                </h1>
                <p className="flex items-center gap-1.5 text-sm text-[#003C2F]/60">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50/60 p-4">
                <GraduationCap className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-800/60">
                    Enrolled Programs
                  </p>
                  <p className="text-lg font-bold text-[#003C2F]">
                    {enrolledCourses.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50/60 p-4">
                <BookOpen className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-800/60">
                    Member Since
                  </p>
                  <p className="text-lg font-bold text-[#003C2F]">
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased courses */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#003C2F]">My Courses</h2>
          <span className="text-sm text-[#003C2F]/60">
            {enrolledCourses.length} purchased
          </span>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((enrollment) => (
              <CourseCard
                key={enrollment.id}
                course={enrollment.course}
                enrolledAt={enrollment.enrolledAt}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-green-100 bg-white p-12 text-center shadow-sm">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-green-600/40" />
            <h3 className="mb-2 text-lg font-semibold text-[#003C2F]">
              No courses yet
            </h3>
            <p className="mb-6 text-[#003C2F]/60">
              Start your learning journey by enrolling in a course.
            </p>
            <Button
              onClick={() => (window.location.href = '/courses')}
              className="rounded-full bg-green-600 px-8 py-6 shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
            >
              Browse Courses
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
