import { PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

export async function setCors() {
  try {
    const s3 = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    await s3.send(
      new PutBucketCorsCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        CORSConfiguration: {
          CORSRules: [
            {
              AllowedHeaders: ['*'],
              AllowedMethods: ['GET', 'HEAD'],
              AllowedOrigins: ['*'], // TODO-- In production, replace with domain
              ExposeHeaders: [
                'ETag',
                'Content-Length',
                'Content-Type',
                'Accept-Ranges',
              ],
              MaxAgeSeconds: 3000,
            },
          ],
        },
      }),
    );
    console.log('CORS configuration set successfully');
  } catch (error) {
    console.error('Error setting CORS:', error);
  }
}
