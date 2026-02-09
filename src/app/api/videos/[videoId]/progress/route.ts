import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import db from '@/db';
import { authOptions } from '@/lib/auth_options';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> },
) {
  try {
    const { videoId } =  await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const { progress, completed } = await req.json();

    const videoProgress = await db.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId: user.id,
          videoId: videoId,
        },
      },
      update: {
        progress,
        completed,
        lastWatched: new Date(),
      },
      create: {
        userId: user.id,
        videoId: videoId,
        progress,
        completed,
        lastWatched: new Date(),
      },
    });

    return NextResponse.json(videoProgress);
  } catch (error) {
    console.error('Error updating video progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> },
) {
  try {
    const { videoId } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const progress = await db.videoProgress.findUnique({
      where: {
        userId_videoId: {
          userId: user.id,
          videoId: videoId,
        },
      },
    });

    return NextResponse.json(progress || { progress: 0, completed: false });
  } catch (error) {
    console.error('Error getting video progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
