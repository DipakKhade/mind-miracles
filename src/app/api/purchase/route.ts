import db from '@/db';
import { courses } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { FormState } from '@/store';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  const { form_values, course_id, amountToPay } = (await request.json()) as {
    form_values: FormState;
    course_id: string;
    amountToPay: number;
  };
  const { name, age, whatsapp, email } = form_values;
  try {
    //FIX : amount_to_pay get it from razorpay payment response
    const newPurchase = await db.enrollment.create({
      data: {
        courseId: course_id,
        userId: user.id,
        enrolledAt: new Date(),
        payment: {
          create: {
            amount: amountToPay,
            method: 'razorpay',
            status: 'COMPLETED',
            paidAt: new Date(),
          },
        },
      },
    });

    return NextResponse.json({
      message: `Registration successful`,
      id: newPurchase.id,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Registration failed',
    });
  }
}
