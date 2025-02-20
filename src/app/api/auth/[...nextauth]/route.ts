import nextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

console.log('process.env.GOOGLE_CLIENT_ID------',process.env.GOOGLE_CLIENT_ID)
console.log('process.env.GOOGLE_CLIENT_SECRET------',process.env.GOOGLE_CLIENT_SECRET)
console.log('process.env.NEXT_AUTH_SECRET------',process.env.NEXT_AUTH_SECRET)
const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET || 'asddipaksecrete',

  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log(
        '----------------------------------->',
        user,
        account,
        profile,
      );
      return true;
    },
  },
});

export const GET = handler;
export const POST = handler;
