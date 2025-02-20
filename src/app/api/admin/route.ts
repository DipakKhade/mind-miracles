import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function POST(req: NextRequest) {
  try{
    const register = await db.register.findMany({});
    const sevendayprogram = await db.sevenDaysProgramUser.findMany({});
    const personalcounselling = await db.personalCounsellingUser.findMany({});

    return NextResponse.json({
      success: true,
      register,
      sevendayprogram,
      personalcounselling,
    });
  }catch(error){
    throw error
  }
  }
  

