import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import VimeoPlayer from '@/components/vedio-player';

interface PageProps {
  params: {
    vimeoId: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          <Suspense fallback={<VideoPlayerSkeleton />}>
            <VimeoPlayer vimeoId={params.vimeoId} />
          </Suspense>
        </Card>
      </div>
    </main>
  );
}

function VideoPlayerSkeleton() {
  return (
    <div className="flex aspect-video w-full animate-pulse items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-muted-foreground/20" />
        <div className="h-4 w-32 rounded bg-muted-foreground/20" />
      </div>
    </div>
  );
}
