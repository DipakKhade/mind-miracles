import db from '@/db';
import { RZR_PRECISION_CONST } from '@/lib';
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.key_id as string,
  key_secret: process.env.key_secret,
});

export async function POST(req: Request) {
  const { course_id } = await req.json();
  try {
    let amount;
    if (course_id) {
      const courseAmount = await db.course.findFirst({
        where: {
          id: course_id,
        },
        select: {
          price: true,
        },
      });

      if (!courseAmount?.price) {
        return NextResponse.json({
          message: 'course price not found!',
        });
      }

      amount = courseAmount.price * RZR_PRECISION_CONST;
    } else {
      amount = 99 * RZR_PRECISION_CONST; // need to fix this sice user can intercept the request and pay 99 for course
    }

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({
      message: 'error occured while creating a order',
    });
  }
}
