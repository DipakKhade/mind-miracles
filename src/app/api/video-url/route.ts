// pages/api/video-url.ts
import { getServerSession } from "next-auth/next";
import { generateSignedUrl } from "@/lib/s3";
import { authOptions } from "@/lib/auth_options";

export async function GET(req: any, res: any) {
  const session = await getServerSession(authOptions);
  console.log("session------------------------------------------------------------------------------------------------------------------------------------------------", session);

  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const videoId = req.nextUrl.searchParams.get("videoId");
  console.log("videoId------------------------------------------------------------------------------------------------------------------------------------------------", videoId);

  // Replace this with your DB check:
  const hasAccess = true; // Example: check if session.user.email has access to videoId

  if (!hasAccess) return res.status(403).json({ error: "Forbidden" });

  // const key = `test-cource/${videoId}.mp4`;
  const key = `test-cource/2025-03-12 18-06-18.mov`;

  const url = await generateSignedUrl(key);
  console.log(url);

  return res.status(200).json({ url });
}
