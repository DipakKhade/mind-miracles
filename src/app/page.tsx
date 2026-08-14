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
    <main className="bg-slate-50">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Hero />
      <Features />
      <WhoWeAre />
      <div>{/* <ServicesCards /> */}</div>
      <div className="flex items-center justify-center py-8 md:py-16">
        <MissionVision />
      </div>
      <Founder />
      <Register />
      {/* <Footer /> */}
    </main>
  );
}
