'use client';
import { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import VimeoPlayer from '@/components/vedio-player';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getVideoMetaData, validateUserForVideo } from '@/actions/courses';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  params: {
    courseId: string;
    videoId: string;
  };
}

export default function Page({ params }: PageProps) {
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const vimeoId = searchParams.get('vid');
  if (!vimeoId) {
    router.back();
  }
  useEffect(() => {
    setIsLoadingMetadata(true);
    (async () => {
      const session = await getSession();
      if (!session) {
        router.push('/');
        toast.warning('sign to your account');
      } else if (session && session.user?.email) {
        const validateUser = await validateUserForVideo(
          session.user?.email,
          params.courseId,
        );
        if (!validateUser) {
          toast.warning('/unAuthenticated user');
          router.push(`/courses/view/${params.courseId}`);
        } else {
          setVideoMetadata(await getVideoMetaData(params.videoId));
          setIsLoadingMetadata(false);
        }
      }
    })();

    () => setIsLoadingMetadata(false);
  }, [params]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Video Player Card */}
        <Card className="overflow-hidden">
          <Suspense fallback={<VideoPlayerSkeleton />}>
            <VimeoPlayer vimeoId={vimeoId || ""} videoId={params.videoId} />
          </Suspense>
        </Card>

        {/* Video Information Card */}
        <Card>
          <CardHeader>
            {isLoadingMetadata ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ) : (
              <div className="space-y-2">
                <h1 className="text-2xl font-bold leading-tight text-green-500">{videoMetadata?.title}</h1>
                {videoMetadata?.duration && (
                  <p className="text-sm text-muted-foreground">Duration: {formatDuration(100)}</p>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isLoadingMetadata ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {videoMetadata?.description}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
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
