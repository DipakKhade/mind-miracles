import nextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRETE || 'dipakkhadethisisaewljiqwu',
});

export const GET = handler;
export const POST = handler;
