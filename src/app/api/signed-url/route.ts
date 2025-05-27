import { getServerSession } from 'next-auth/next';
import { generateSignedUrl } from '@/lib/s3';
import { authOptions } from '@/lib/auth_options';
import { NextRequest, NextResponse } from 'next/server';
import { BUCKET_COURSE_DIR } from '@/lib';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const videoId = req.nextUrl.searchParams.get('videoId');
  const hasAccess = true;

  if (!hasAccess)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const key = `${BUCKET_COURSE_DIR}/${videoId}`;
  const url = await generateSignedUrl(key);

  return NextResponse.json({ url });
}
