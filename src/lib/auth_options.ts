import GoogleProvider from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';
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
    async signIn({ user, account }: { user: any; account: any }) {
      if (user?.email) {
        const sessionToken = uuidv4();        // unique per login --dipak

        await db.user.upsert({
          where: { email: user.email },
          update: {
            token: account?.access_token,
            sessionToken, 
          },
          create: {
            email: user.email,
            name: user.name,
            role: AdminMails.includes(user.email) ? 'ADMIN' : 'STUDENT',
            password: 'random',
            token: account?.access_token,
            profileImage: user.image,
            sessionToken,
          },
        });

        // sessionToken into JWT
        (user as any).sessionToken = sessionToken;
      }
      return true;
    },

    async jwt({ token, user }: { token: any; user: any }) {
      if (user?.sessionToken) {
        token.sessionToken = user.sessionToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      const dbUser = await db.user.findUnique({
        where: { email: session.user.email },
      });

      if (!dbUser || dbUser.sessionToken !== token.sessionToken) {
        return null;          // force sign out
      }

      session.user.role = dbUser.role;
      return session;
    },
  },
};
