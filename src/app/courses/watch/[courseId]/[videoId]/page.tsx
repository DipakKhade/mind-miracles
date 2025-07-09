'use client';
import { Suspense, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import VimeoPlayer from '@/components/vedio-player';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { validateUserForVideo } from '@/actions/courses';
import { useSearchParams } from 'next/navigation';

interface PageProps {
  params: {
    courseId: string;
    videoId: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vimeoId = searchParams.get('vid');
  if (!vimeoId) {
    router.back();
  }
  useEffect(() => {
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
        }
      }
    })();
  }, [params]);

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden">
          <Suspense fallback={<VideoPlayerSkeleton />}>
            <VimeoPlayer vimeoId={vimeoId || ''} videoId={params.videoId} />
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
