import { CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

interface CourseFeature {
  id: string;
  feature: string;
  featureDesc?: string;
}

interface ProgramInfoProps {
  courseDescription: string;
  courseFeatures: CourseFeature[];
}

export const ProgramInfo = ({
  courseDescription,
  courseFeatures,
}: ProgramInfoProps) => {
  return (
    <section className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <Card className="overflow-hidden rounded-2xl border-green-100 shadow-sm">
          <CardHeader className="bg-gradient-to-br from-green-50 to-white">
            <CardTitle className="text-2xl font-bold text-[#003C2F]">
              About the Program
            </CardTitle>
            <CardDescription className="text-sm/6 md:text-sm/7">
              {courseDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h3 className="mb-4 text-lg font-bold text-[#003C2F]">
                Key Features:
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {courseFeatures.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className="flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50 hover:shadow-md"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <div>
                      <h4 className="mb-1 font-semibold text-[#003C2F]">
                        {feature.feature}
                      </h4>
                      {feature.featureDesc && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {feature.featureDesc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
