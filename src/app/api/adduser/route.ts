import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

export async function POST(req: NextRequest) {
  const { name, phone, razorpay_payment_id } = await req.json();
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: process.env.ADMIN_WHATSAPP_NUMBER!,
      body: `✅ New Payment Received!\n Name: ${name} \nWhatsApp No: ${phone} \nAmount: ₹99\n\nPlease add them to the WhatsApp group.`,
    });

    await db.wpGroupMembers.create({
      data: {
        name,
        wpNumber: phone,
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    return NextResponse.json({
      message: 'Payment verified & admin notified',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Paymentmsg send failed , please conact to Admin',
    });
  }
}
