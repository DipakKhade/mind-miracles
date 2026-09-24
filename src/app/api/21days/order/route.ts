import { NextRequest, NextResponse } from 'next/server';
import { RZR_PRECISION_CONST } from '@/lib';
import Razorpay from 'razorpay';
import db from '@/db';

const razorpay = new Razorpay({
  key_id: process.env.key_id as string,
  key_secret: process.env.key_secret,
});

export async function POST(req: NextRequest) {
  try {
    const systemParameter = await db.systemParameter.findFirst();
    const programFee = Number(systemParameter?.fees) || 1549;
    const order = await razorpay.orders.create({
      amount: programFee * RZR_PRECISION_CONST,
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
