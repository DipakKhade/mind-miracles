import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { AdminMails } from '@/lib';
import { authOptions } from '@/lib/auth_options';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    if (AdminMails.includes(session?.user?.email!)) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'NOT AUTHORIZED',
      });
    }
  } catch (error) {
    throw error;
  }
}
