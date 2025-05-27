import { getServerSession } from 'next-auth/next';
import { generateSignedUrl } from '@/lib/s3';
import { authOptions } from '@/lib/auth_options';
import { NextRequest, NextResponse } from 'next/server';
import { BUCKET_COURSE_DIR } from '@/lib';
import { Readable } from 'stream';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  let videoPath = req.nextUrl.searchParams.get('video');
  if (!videoPath?.endsWith('.m3u8')) {
    videoPath = `${videoPath}/output.m3u8`;
  }
  console.log('videoPath================:', videoPath);
  const basePath = videoPath?.replace('/output.m3u8', '') ?? '';
  console.log('basePath================:', basePath);
  const segmentPrefix = `test-cource/${basePath}`;
  console.log('segmentPrefix================:', segmentPrefix);
  const m3u8Object = await s3.send(new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `test-cource/${videoPath}`,
  }));
  //test-cource/test/output.m3u8
  const m3u8Text = await streamToString(m3u8Object.Body as Readable);

  //@ts-ignore
  const segmentFiles = [...m3u8Text.matchAll(/(output\d+\.ts)/g)];
  console.log('segmentFiles:====================', segmentFiles);

  const replacements = await Promise.all(segmentFiles.map(async ([filename]) => {
    const signedUrl = await generateSignedUrl(`${segmentPrefix}/${filename}`);
    return [filename, signedUrl];
  }));

  let updatedM3u8 = m3u8Text;
  for (const [filename, url] of replacements) {
    updatedM3u8 = updatedM3u8.replace(filename, url);
  }

  return new NextResponse(updatedM3u8, {
    headers: { 'Content-Type': 'application/vnd.apple.mpegurl' },
  });
}

async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}
