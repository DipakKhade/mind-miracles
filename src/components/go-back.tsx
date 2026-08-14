import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function GoBack({
  backTo,
  backToRoute,
}: {
  backTo: string;
  backToRoute: string;
}) {
  const router = useRouter();
  return (
    <>
      <header className="sticky top-16 z-40 border-b border-gray-200 bg-white/85 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-gray-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => router.push(`/${backToRoute}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {backTo}
              </Button>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Mindmiracles
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
