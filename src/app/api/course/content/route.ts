import { authOptions } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }



   
  } catch (error) {
    console.error('S3 Error:', error);
    return NextResponse.json(
      { error: 'Failed to list folders' },
      { status: 500 },
    );
  }
}
