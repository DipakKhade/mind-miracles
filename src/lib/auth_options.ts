import GoogleProvider from 'next-auth/providers/google';
import db from '@/db';
import { AdminMails } from '.';

const clinet_id = process.env.GOOGLE_CLIENT_ID || '';
const client_secret = process.env.GOOGLE_CLIENT_SECRET || '';
const next_auth_secret = process.env.NEXT_AUTH_SECRET || 'asddipaksecrete';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: clinet_id,
      clientSecret: client_secret,
    }),
  ],

  secret: next_auth_secret,

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile: any;
    }) {
      if ((user.email, user.name, user.image, account?.access_token)) {
        await db.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            token: account?.access_token,
          },
          create: {
            email: user.email!,
            name: user.name!,
            role: AdminMails.includes(user.email!) ? 'ADMIN' : 'STUDENT',
            password: 'random',
            token: account?.access_token,
            profileImage: user.image,
          },
        });
      }

      return true;
    },

    async session({ session, token }: { session: any; token: any }) {
      return session;
    },
  },
};
