"use client"

import { BookOpen } from "lucide-react"
import { Link } from "lucide-react"
import { Button } from "./ui/button"
import { CourseCard } from "./course-card"
import { useEffect, useState } from "react"
import Loading from "@/app/purchases/loading"
import { GoBack } from "./go-back"

export default function PurchasesView() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/purchase/courses")

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()
        setEnrolledCourses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching courses:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (isLoading) return <Loading />

  if (error) {
    return (
      <>
        <GoBack backTo="Courses" backToRoute="courses" />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-red-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">Error loading courses</h3>
            <p className="mb-6 text-gray-600">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
              Try Again
            </Button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <GoBack backTo="Courses" backToRoute="courses" />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((enrollment) => (
              <CourseCard key={enrollment.id} course={enrollment.course} enrolledAt={enrollment.enrolledAt} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No courses yet</h3>
            <p className="mb-6 text-gray-600">Start your learning journey by enrolling in a course</p>
            <Link href="/courses">
              <Button className="bg-green-600 hover:bg-green-700">Browse Courses</Button>
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
