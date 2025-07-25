import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import db from '@/db';
import { authOptions } from '@/lib/auth_options';

export async function GET(
  req: NextRequest,
  { params }: { params: { videoId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const video = await db.video.findUnique({
      where: { id: params.videoId },
      include: { course: true },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const userCourse = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: video.courseId,
      },
    });

    if (!userCourse) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({
      video: {
        id: video.id,
        title: video.title,
        description: video.description,
        vimeoId: video.vimeoId,
        dayNumber: video.dayNumber,
      },
    });
  } catch (error) {
    console.error('Error getting video:', error);
    return NextResponse.json({ error: 'Failed to get video' }, { status: 500 });
  }
}
