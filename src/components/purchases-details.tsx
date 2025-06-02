import { BookOpen, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

export const PurchasesDetails = ({
  enrolledCourseslength,
}: {
  enrolledCourseslength: number;
}) => {
  return (
    <div>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  My Purchases
                </h1>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {enrolledCourseslength} Courses Enrolled
            </Badge>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Courses
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {enrolledCourseslength}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Certificates
                  </p>
                  <p className="text-3xl font-bold text-green-600">1</p>
                </div>
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
