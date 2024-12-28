import { FeeInfo } from '@/components/7-days-program/FeeInfo'
import { ProgramInfo } from '@/components/7-days-program/ProgramInfo'
import { ProgramRegistration } from '@/components/7-days-program/ProgramRegistration'
import { VideoPreview } from '@/components/7-days-program/VideoPreview'
import {Hero} from '@/components/7-days-program/Hero'
import { TermsAndConditions } from '@/components/7-days-program/TermsAndConditions'
// import { Textarea } from "@/components/ui/textarea"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f7f5]">
     <Hero/>
      <ProgramInfo/>
      <VideoPreview videolink='https://www.youtube.com/embed/v0cTo4eGAOM?si=ADoHRITZoxuHZAxK'/>
      <FeeInfo/>
    <ProgramRegistration/>
    <TermsAndConditions/>
    </div>
  )
}











