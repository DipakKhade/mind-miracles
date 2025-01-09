import { ProgramInfo } from "@/components/7-days-program/ProgramInfo";
import { ProgramRegistration } from "@/components/7-days-program/ProgramRegistration";
import { VideoPreview } from "@/components/7-days-program/VideoPreview";
import { TermsAndConditions } from "@/components/7-days-program/TermsAndConditions";
import { Hero } from "@/components/personal-counselling/Hero";
import { FeeInfo } from "@/components/common/fee-info";

export default function page() {
  return (
    <>
      <div className="min-h-screen bg-[#f5f7f5]">
        <Hero />
        {/* <ProgramInfo />*/}
        <VideoPreview videolink="https://www.youtube.com/embed/v0cTo4eGAOM?si=ADoHRITZoxuHZAxK" />
        <FeeInfo feeAmount={99} />
        <ProgramRegistration />
        <TermsAndConditions />
      </div>
    </>
  );
}
