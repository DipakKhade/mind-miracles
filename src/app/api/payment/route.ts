import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.key_id!,
  key_secret: process.env.key_secret!,
});

export async function POST(request: NextRequest) {
  const { amount, currency } = (await request.json()) as {
    amount: string;
    currency: string;
  };

  var options = {
    amount: amount,
    currency: currency,
    receipt: 'recipt_asd',
  };
  const order = await razorpay.orders.create(options);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
