import Register from "@/components/Register";
import { Programs } from "@/components/Programs";
import Script from "next/script";
import Payment from "@/components/Payment";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoAreWe";
import { ServicesCards } from "@/components/ServicesCards";
import MissionVision from "@/components/MissionVision";
import Founder from "@/components/Founder";

export default function Home() {
  return (
    <main className="p-2 md:p-8 bg-slate-50">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <Hero />
      <WhoWeAre />
      <div>
        <ServicesCards />
      </div>
      <div className="min-h-screen flex items-center justify-center">
      <MissionVision />
    </div>

    <Founder/>

      <Register />
    </main>
  );
}
