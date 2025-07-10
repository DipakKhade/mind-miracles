import Register from '@/components/Register';
import Script from 'next/script';
import Hero from '@/components/Hero';
import WhoWeAre from '@/components/WhoAreWe';
// import { ServicesCards } from "@/components/ServicesCards";
import MissionVision from '@/components/MissionVision';
import Founder from '@/components/Founder';
import { Footer } from '@/components/Footer';
import { Features } from '@/components/features';

export default function Home() {
  return (
    <main className="bg-slate-50 p-2">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="md:p-8">
        <Hero />
        <Features />
        <WhoWeAre />
        <div>{/* <ServicesCards /> */}</div>
        <div className="flex min-h-screen items-center justify-center">
          <MissionVision />
        </div>
        <div className="">
          <Founder />
        </div>
        {/* <Payment/> */}
      </div>
      <Register />
      {/* <Footer /> */}
    </main>
  );
}
