// import { getServerSession } from 'next-auth/next';
// import { generateSignedUrl } from '@/lib/s3';
// import { authOptions } from '@/lib/auth_options';
// import { NextRequest, NextResponse } from 'next/server';
// import { Readable } from 'stream';
// import {
//   GetObjectCommand,
//   PutBucketCorsCommand,
//   S3Client,
// } from '@aws-sdk/client-s3';
// import { setCors, streamToString } from '@/lib/common-functions';

// const s3 = new S3Client({
//   region: 'eu-north-1',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) return new NextResponse('Unauthorized', { status: 401 });

//     let videoPath = req.nextUrl.searchParams.get('video');

//     if (!videoPath?.endsWith('.m3u8')) {
//       videoPath = `${videoPath}/output.m3u8`;
//     }

//     const basePath = videoPath?.replace('/output.m3u8', '') ?? '';
//     const segmentPrefix = `test-cource/${basePath}`;
//     await setCors();
//     const m3u8Object = await s3.send(
//       new GetObjectCommand({
//         Bucket: process.env.AWS_S3_BUCKET_NAME!,
//         Key: `test-cource/${videoPath}`,
//       }),
//     );

//     const m3u8Text = await streamToString(m3u8Object.Body as Readable);

//     //@ts-ignore
//     const segmentFiles = [...m3u8Text.matchAll(/(output\d+\.ts)/g)];

//     const replacements = await Promise.all(
//       segmentFiles.map(async ([filename]) => {
//         const signedUrl = await generateSignedUrl(
//           `${segmentPrefix}/${filename}`,
//         );
//         return [filename, signedUrl];
//       }),
//     );

//     let updatedM3u8 = m3u8Text;
//     for (const [filename, url] of replacements) {
//       updatedM3u8 = updatedM3u8.replace(filename, url);
//     }

//     // Return JSON response with the manifest content
//     return NextResponse.json(
//       {
//         url: updatedM3u8,
//         type: 'hls_manifest',
//       },
//       {
//         headers: {
//           'Cache-Control': 'no-store',
//           'Access-Control-Allow-Origin': '*',
//         },
//       },
//     );
//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to process video manifest' },
//       { status: 500 },
//     );
//   }
// }

import { getServerSession } from 'next-auth/next';
import { generateSignedUrl } from '@/lib/s3'; // Should also use R2-compatible S3Client
import { authOptions } from '@/lib/auth_options';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { setCors, streamToString } from '@/lib/common-functions';

const s3 = new S3Client({
  region: 'auto', // Cloudflare R2 uses 'auto' or 'us-east-1'
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse('Unauthorized', { status: 401 });

    let videoPath = req.nextUrl.searchParams.get('video');

    if (!videoPath?.endsWith('.m3u8')) {
      videoPath = `${videoPath}/output.m3u8`;
    }

    const basePath = videoPath?.replace('/output.m3u8', '') ?? '';
    const segmentPrefix = `test-course/${basePath}`;

    await setCors();
    const m3u8Object = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: `test-cource/${videoPath}`,
      }),
    );

    const m3u8Text = await streamToString(m3u8Object.Body as Readable);
    //@ts-ignore
    const segmentFiles = [...m3u8Text.matchAll(/(output\d+\.ts)/g)];

    const replacements = await Promise.all(
      segmentFiles.map(async ([filename]) => {
        const signedUrl = await generateSignedUrl(
          `${segmentPrefix}/${filename}`,
        );
        return [filename, signedUrl];
      }),
    );

    let updatedM3u8 = m3u8Text;
    for (const [filename, url] of replacements) {
      updatedM3u8 = updatedM3u8.replace(filename, url);
    }

    return NextResponse.json(
      {
        url: updatedM3u8,
        type: 'hls_manifest',
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process video manifest' },
      { status: 500 },
    );
  }
}
