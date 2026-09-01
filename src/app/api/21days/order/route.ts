import { NextRequest, NextResponse } from 'next/server';
import { RZR_PRECISION_CONST } from '@/lib';
import Razorpay from 'razorpay';

const PROGRAM_FEE = 1549;

const razorpay = new Razorpay({
  key_id: process.env.key_id as string,
  key_secret: process.env.key_secret,
});

export async function POST(req: NextRequest) {
  try {
    const order = await razorpay.orders.create({
      amount: PROGRAM_FEE * RZR_PRECISION_CONST,
      currency: 'INR',
      receipt: `21days_${Date.now()}`,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.key_id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error occurred while creating the order' },
      { status: 500 },
    );
  }
}
