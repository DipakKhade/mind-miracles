import db from "@/db";
import { authOptions } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const data = await db.wpGroupMembers.findMany({
            select: {
                id: true,
                name: true,
                wpNumber: true,
                isAddedToGroup: true
            }
        })

        return NextResponse.json({
            success: true,
            data
        })

    } catch(error) {
        return NextResponse.json({
            success: false,
            message: error
        })
    }

}