import { AWS_REGION, BUCKET_NAME } from '@/lib';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const bucketName = BUCKET_NAME;
    const prefix = '6837ced9a1711ec98dcc6fef/'; 
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      Delimiter: '/', 
    });

    const data = await s3.send(command);

    const folders = (data.CommonPrefixes || []).map(p => p.Prefix);

    return NextResponse.json({ folders });
  } catch (error) {
    console.error('S3 Error:', error);
    return NextResponse.json({ error: 'Failed to list folders' }, { status: 500 });
  }
}
