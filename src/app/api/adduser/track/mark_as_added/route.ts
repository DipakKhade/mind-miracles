import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    await db.wpGroupMembers.update({
      where: {
        id,
      },
      data: {
        isAddedToGroup: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'marked as user added to group',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
