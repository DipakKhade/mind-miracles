import { BookOpen, Calendar, Play } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Progress } from './progress';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  previewURL: string;
  courseFeature: any[];
  isActive: boolean;
  isPaid: boolean;
  thumbnailURL: string;
}

export const CourseCard = ({
  course,
  enrolledAt,
}: {
  course: Course;
  enrolledAt: string;
}) => {
  console.log('course-----from course-card-------', course);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="overflow-hidden border-green-100 transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={course.thumbnailURL || '/placeholder.svg?height=200&width=300'}
          alt={course.title}
          width={300}
          height={200}
          className="h-48 w-full object-cover"
        />
        <div className="absolute right-4 top-4">
          <Badge className="bg-green-600 hover:bg-green-700">
            ₹ {course.price}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg font-semibold text-gray-900">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-gray-600">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-green-600">65%</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>

        {/* Course Features */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Course Features:</p>
          <div className="flex flex-wrap gap-1">
            {course.courseFeature.slice(0, 2).map(({ feature }, index) => {
              return (
                <Badge
                  variant={'outline'}
                  key={index}
                  className="border-green-200 text-xs text-green-700"
                >
                  {feature}
                </Badge>
              );
            })}
            {course.courseFeature.length > 2 && (
              <Badge
                variant={'outline'}
                className="border-green-200 text-xs text-green-700"
              >
                +{course.courseFeature.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        {/* Enrollment Date */}
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          Enrolled on {formatDate(enrolledAt)}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1 bg-green-600 hover:bg-green-700">
          <Play className="mr-2 h-4 w-4" />
          Continue Learning
        </Button>
        <Button
          variant="outline"
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
