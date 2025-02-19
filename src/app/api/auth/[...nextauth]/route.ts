import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "615488432039-akalbnn05gdef77dkil8hd55vmh19qid.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRETE || "dipakkhadethisisaewljiqwu",
});

export const GET = handler;
export const POST = handler;