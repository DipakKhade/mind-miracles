import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export const ProgramInfo = ({
  courseDescription,
  courseFeatures,
}: {
  courseDescription: string;
  courseFeatures: any[];
}) => {
  return (
    <>
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>About the Program</CardTitle>
              <CardDescription>{courseDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Key Features:</p>
              <ul className="list-disc space-y-2 pl-6">
                {courseFeatures.map((x: any, index: number) => (
                  <li key={index}>{x.feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
