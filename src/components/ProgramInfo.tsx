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
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle>About the Program</CardTitle>
            <CardDescription className="text-sm/6 md:text-sm/7">
              {courseDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Key Features:</h3>
              <div className="space-y-4">
                {courseFeatures.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className="rounded-sm border-l-4 border-primary bg-green-100 pl-4"
                  >
                    <h4 className="mb-1 font-medium text-foreground">
                      {feature.feature}
                    </h4>
                    {feature.featureDesc && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.featureDesc}
                      </p>
                    )}
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
