import { NextRequest, NextResponse } from 'next/server';
import { getTestResultMail } from '@/mail';
import db from '@/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.assessmentResult.create({
      data: {
        name: data.name,
        age: Number(data.age),
        occupation: data.occupation,
        mobile: data.mobile,
        email: data.email,
        score: data.score,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    await getTestResultMail(data);

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Test results saved successfully',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to save test results',
    });
  }
}
