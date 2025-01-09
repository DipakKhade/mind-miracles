import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import Appbar from "@/components/Appbar";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const merriweather = Merriweather({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Mindmiracles",
  description:
    "Mind Miracles is a dedicated Hypnotherapy and healing center established in 2019, focused on empowering the mental health of society, particularly the youth. We offer expert Hypnotherapy and counseling services to address your mental, emotional, and educational needs with care and expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.className} text-[#003C2F] bg-[#F8F9FA] box-border`}
      >
        <NextTopLoader showSpinner={false} color="#19c255" />
        <Appbar />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
