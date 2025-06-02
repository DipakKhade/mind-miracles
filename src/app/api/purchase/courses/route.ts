import db from '@/db';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  const courses = await db.enrollment.findMany({
    where: {
      userId: user.id,
    },
    include: {
      course: {
        include: {
          courseFeature: {
            select: {
              feature: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(courses);
}
