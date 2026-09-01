import type { Metadata } from 'next';
import Hero from './Hero';
import InfoVideo from './InfoVideo';
import Testimonials from './Testimonials';
import ProgramDetails from './ProgramDetails';
import SessionInfo from './SessionInfo';
import ProgramBenefits from './ProgramBenefits';
import ProgramSchedule from './ProgramSchedule';
import RegistrationCTA from './RegistrationCTA';

export const metadata: Metadata = {
  title: '21 Days Life Changing Program | Mind Miracles',
  description:
    '७ ऑगस्ट २०२६ पासून सुरू होणाऱ्या 21 Days Life Changing Program मध्ये सामील व्हा. हिप्नोथेरपी, ध्यान आणि माइंडफुलनेस एकत्र करून तुमची पूर्ण क्षमता उजागर करणारा परिवर्तनकारी प्रवास.',
};

export default function TwentyOneDaysProgramPage() {
  return (
    <main className="bg-white">
      <Hero />
      <InfoVideo />
      <Testimonials />
      <ProgramDetails />
      <SessionInfo />
      <ProgramBenefits />
      <ProgramSchedule />
      {/* <RegistrationCTA /> */}
    </main>
  );
}
