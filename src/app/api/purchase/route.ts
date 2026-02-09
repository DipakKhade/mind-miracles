import db from '@/db';
import { courses } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { FormState } from '@/store';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';
import { generateCertificateNumber } from '@/lib/common-functions';

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
  const {
    form_values,
    course_id,
    amountToPay,
    orderId,
    razorpayPaymentId,
    razorpaySignature,
  } = (await request.json()) as {
    form_values: FormState;
    course_id: string;
    amountToPay: number;
    orderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  };
  const { name, age, whatsapp } = form_values;
  try {
    const certificationId = generateCertificateNumber();

    const txn = await db.$transaction(async (tx: any) => {
      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          age: +age,
          whatsAppNo: whatsapp,
          name,
        },
      });

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
              razorpayPaymentId,
              razorpayOrderId: orderId,
              razorpaySignature,
              certificationId,
            },
          },
        },
      });
    });

    return NextResponse.json({
      message: `Registration successful`,
      id: 'newPurchase.id',
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Registration failed',
    });
  }
}
