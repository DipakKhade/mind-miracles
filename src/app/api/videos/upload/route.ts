import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { AdminMails } from '@/lib';
import db from '@/db';
import { authOptions } from '@/lib/auth_options';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !AdminMails.includes(session.user.email)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { courseId, title, description, dayNumber, vimeoId } =
      await req.json();

    if (!courseId || !title || !description || !dayNumber || !vimeoId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Create video record in database with Vimeo ID
    const video = await db.video.create({
      data: {
        title,
        description,
        vimeoId,
        dayNumber,
        courseId,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error creating video:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
