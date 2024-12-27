import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const {name,email,whatsapp,age,amountToPay} = (await request.json()) as {
        name:string,
        email:string,
        whatsapp:string,
        age:string,
        amountToPay:number
      }
      try{
        const newPurchase = await db.sevenDaysProgramUser.create({
            data:{
                name,
                email,
                whatsapp:+whatsapp,
                age:+age,
                amountPaid:amountToPay
            }
          })
          console.log(newPurchase)
          return NextResponse.json({
            message:`Registration successful`,
            id:newPurchase.id
          })

      }catch(error){
        return NextResponse.json({
            message:'Registration failed'
        })
    }
}