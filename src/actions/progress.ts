'use server';

import db from '@/db';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';

export async function updateVideoProgress({
  videoId,
  progress,
  completed = false,
}: {
  videoId: string;
  progress: number;
  completed?: boolean;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('User not authenticated');
    }

    const user = await db.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    const videoProgress = await db.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId: user.id,
          videoId,
        },
      },
      update: {
        progress,
        completed,
        lastWatched: new Date(),
        updatedAt: new Date(),
        videoId,
      },
      create: {
        userId: user.id,
        videoId,
        progress,
        completed,
        lastWatched: new Date(),
      },
    });

    return { success: true, data: videoProgress };
  } catch (error) {
    console.error('Error updating video progress:', error);
    return { success: false, error: 'Failed to update progress' };
  }
}

export async function getVideoProgress({ videoId }: { videoId: string }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: 'User not authenticated' };
    }

    const user = await db.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    const videoProgress = await db.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId: user?.id,
          videoId,
        },
      },
    });

    return { success: true, data: videoProgress };
  } catch (error) {
    console.error('Error getting video progress:', error);
    return { success: false, error: 'Failed to get progress' };
  }
}

export async function getCourseProgress(courseId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, error: 'User not authenticated' };
  }

  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user?.id) {
    return { success: false, error: 'User not authenticated' };
  }

  const videos = await db.video.findMany({
    where: { courseId },
    select: { id: true },
  });

  const videoIds = videos.map((v: any) => v.id);

  const progresses = await db.videoProgress.findMany({
    where: {
      userId: user.id,
      videoId: { in: videoIds },
    },
    select: { progress: true },
  });

  const totalVideos = videos.length;
  const totalProgress = progresses.reduce(
    (sum: any, p: any) => sum + p.progress,
    0,
  );

  const avgProgress = totalVideos > 0 ? totalProgress / totalVideos : 0;

  return Math.round(avgProgress);
}
