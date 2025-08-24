import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  console.log('phone in api ----', phone);
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: process.env.ADMIN_WHATSAPP_NUMBER!,
      body: `✅ New Payment Received!\nUser: ${phone} \nAmount: ₹99\n\nPlease add them to the WhatsApp group.`,
    });

    return NextResponse.json({
      message: "Payment verified & admin notified"
    })
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "Paymentmsg send failed , please conact to Admin"
    })
  }
}
