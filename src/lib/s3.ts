// import {
//   S3Client,
//   GetObjectCommand,
//   HeadObjectCommand,
// } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// const s3 = new S3Client({
//   region: 'eu-north-1',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export async function generateSignedUrl(key: string) {
//   try {
//     const headCommand = new HeadObjectCommand({
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: key,
//     });
//     await s3.send(headCommand);
//     const getCommand = new GetObjectCommand({
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: key,
//     });

//     const url = await getSignedUrl(s3, getCommand, { expiresIn: 60 * 5 });
//     return url;
//   } catch (error) {
//     console.error('AWS S3 Error:', error);
//     throw new Error(`Failed to generate signed URL: ${error}`);
//   }
// }

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function generateSignedUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // valid for 5 minutes
}
