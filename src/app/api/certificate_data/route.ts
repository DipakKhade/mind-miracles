import db from "@/db";
import { authOptions } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const session = await getServerSession(authOptions)
        const courseId = await req.nextUrl.searchParams.get('courseId')
        
        if(!session) {
            return NextResponse.json({
                success: false,
                message: "invalid session"
            })
        }

        if(!courseId) {
            return NextResponse.json({
                success: false,
                message: "invalid course id"
            })
        }

        const data = await db.enrollment.findFirst({
            where: {
                user: {
                    email: session.user.email
                },
                courseId
            },
            select: {
                course: {
                    select: {
                        title: true
                    },
                },
                user: {
                    select: {
                        name: true
                    }
                },
                certificationId: true
            }
        })


        return NextResponse.json({
            success: true,
            message: "data retrived succesfully",
            data
        })
        
    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "some error occured"
        })
    }

}