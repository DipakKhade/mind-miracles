import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const FeeInfo = () => {
  return (
    <>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-green-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">Program Fee</CardTitle>
              <CardDescription className="text-white/90">
                Investment in your future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-white mb-4">₹1,499</div>
              <p className="text-white/90">
                One-time payment for complete program access
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};
