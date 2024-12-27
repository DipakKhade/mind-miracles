import Register from "@/components/Register";
import { Programs } from "@/components/Programs";
import Script from "next/script";
import Payment from "@/components/Payment";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoAreWe";
import { ServicesCards } from "@/components/ServicesCards";
import MissionVision from "@/components/MissionVision";
import Founder from "@/components/Founder";
import { Footer } from "@/components/Footer";
import Pay from "@/components/Pay";

export default function Home() {
  return (
    <main className="p-2 bg-slate-50">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="md:p-8">
        <Hero />
        <WhoWeAre />
        <div>{/* <ServicesCards /> */}</div>
        <div className="min-h-screen flex items-center justify-center">
          <MissionVision />
        </div>
        <div className="">
          <Founder />
        </div>
        {/* <Payment/> */}
      </div>
      <Register />
      <Footer />
    </main>
  );
}
