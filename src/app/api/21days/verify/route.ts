import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/db';
import { get21DaysProgramRegistrationMail } from '@/mail';

export async function POST(request: NextRequest) {
  const {
    name,
    whatsappNumber,
    batchNo,
    orderId,
    razorpayPaymentId,
    razorpaySignature,
  } = (await request.json()) as {
    name: string;
    whatsappNumber: string;
    batchNo?: number;
    orderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  };

  if (!name || !whatsappNumber) {
    return NextResponse.json(
      { message: 'Name and WhatsApp number are required', isOk: false },
      { status: 400 },
    );
  }

  const keySecret = process.env.key_secret as string;
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(orderId + '|' + razorpayPaymentId)
    .digest('hex');

  if (generatedSignature !== razorpaySignature) {
    return NextResponse.json(
      { message: 'Payment verification failed', isOk: false },
      { status: 400 },
    );
  }

  try {
    const systemParameter = await db.systemParameter.findFirst();
    const programFee = Number(systemParameter?.fees) || 1549;

    await db.programRegistration.create({
      data: {
        name,
        whatsappNumber,
        batchNo,
        amount: programFee,
        razorpayOrderId: orderId,
        razorpayPaymentId,
        razorpaySignature,
        status: 'COMPLETED',
      },
    });

    await get21DaysProgramRegistrationMail({
      name,
      whatsappNumber,
      batchNo,
      orderId,
      razorpayPaymentId,
      amount: programFee,
    });

    return NextResponse.json(
      { message: 'Payment verified and registration successful', isOk: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed', isOk: false },
      { status: 500 },
    );
  }
}
