import { ProgramInfo } from '@/components/7-days-program/ProgramInfo';
import { VideoPreview } from '@/components/7-days-program/VideoPreview';
import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions';
import { Hero } from '@/components/personal-counselling/Hero';
import { FeeInfo } from '@/components/common/fee-info';
import { ProgramRegistrationForm } from '@/components/common/program-registration';
import { courses } from '@/types';

export default function page() {
  return (
    <>
      <div className="min-h-screen bg-[#f5f7f5]">
        <Hero />
        {/* <ProgramInfo />*/}
        <VideoPreview videolink="https://www.youtube.com/embed/4Aqc2ZIa-VI" />
        <FeeInfo feeAmount={499} />
        <ProgramRegistrationForm
          course_name={courses['personal-couselling']}
          amount_to_pay={499}
        />
        <TermsAndConditions />
      </div>
    </>
  );
}
