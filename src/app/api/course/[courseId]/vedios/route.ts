import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import db from '@/db';
import { authOptions } from '@/lib/auth_options';

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isUserEnrolled = await db.enrollment.findFirst({
      where: {
        courseId: params.courseId,
        userId: user.id,
      },
    });

    if (!isUserEnrolled) {
      return NextResponse.json(
        { error: 'User not enrolled in this course' },
        { status: 404 },
      );
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        video: {
          orderBy: { dayNumber: 'asc' },
          include: {
            progress: {
              where: {
                userId: user.id,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found or access denied' },
        { status: 404 },
      );
    }

    // const daysSincePurchase = Math.floor(
    //   (Date.now() - course.from.getTime()) / (1000 * 60 * 60 * 24),
    // );

    const videos = course.video.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      dayNumber: video.dayNumber,
      progress: video.progress[0]?.progress || 0,
      completed: video.progress[0]?.completed || false,
      unlocked: true,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 },
    );
  }
}
