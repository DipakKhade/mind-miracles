import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { getMailonRegester } from "@/mail";

export async function POST(req: NextRequest) {
  const { firstName, lastName, mobileNo, email, age, place } = await req.json();

  try {
    const data = { firstName, lastName, mobileNo, email, age, place };
    getMailonRegester(data);

    const new_register = await db.register.create({
      data: {
        firstName,
        lastName,
        mobileNo: Number(mobileNo),
        email,
        age: Number(age),
        place,
      },
    });
    console.log(new_register);
    return NextResponse.json({
      success: true,
      message: "register successfully",
    });
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({
    message: false,
  });
}
