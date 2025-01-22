import db from '@/db';
import { courses } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { FormState } from '@/store';

export async function POST(request: NextRequest) {
  debugger;
  const { form_values, course_name, amount_to_pay } =
    (await request.json()) as {
      form_values: FormState;
      course_name: courses;
      amount_to_pay: number;
    };

  const { name, age, whatsapp, email } = form_values;
  try {
    //FIX : amount_to_pay get it from razorpay payment response

    switch (course_name) {
      case courses['seven-day-program']:
        const newPurchase = await db.sevenDaysProgramUser.create({
          data: {
            name,
            email,
            whatsapp: +whatsapp,
            age: +age,
            amountPaid: 1499,
          },
        });
        console.log(newPurchase);
        return NextResponse.json({
          message: `Registration successful`,
          id: newPurchase.id,
        });

      case courses['personal-couselling']:
        const new_purchase = await db.personalCounsellingUser.create({
          data: {
            name,
            email,
            whatsapp: +whatsapp,
            age: +age,
            amountPaid: 99,
          },
        });
        console.log(new_purchase);
        return NextResponse.json({
          message: `Registration successful`,
          id: new_purchase.id,
        });
    }
  } catch (error) {
    return NextResponse.json({
      message: 'Registration failed',
    });
  }
}
