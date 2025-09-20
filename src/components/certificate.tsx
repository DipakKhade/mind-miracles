"use client"

import { Button } from "@/components/ui/button"
import { Download, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import img from '../../public/certbimg.png'
import logo from '../../public/mind_miracles_logo.png'
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface certificationData {
  course: {
    title : string
  },
  user: {
    name: string
  },
  certificationId: string
}

export default function CertificateComponent({ courseId }: {
    courseId: string
}) {
    const [data, SetData] = useState<certificationData>()

    useEffect(()=>{
        const getCertificateInfo = async() =>{
            toast.loading('loading...', {
              position:'top-center'
            })
            const response = await fetch(`/api/certificate_data?courseId=${courseId}`)
            const data = await response.json()
            console.log(data.data)
            SetData(data.data)
            toast.dismiss()
        }

        getCertificateInfo()
    }, [])
  const handleDownload = () => {
    console.log("Download PNG")
  }

  if(!data) {
    return <></>
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Certificate Container */}
      <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        <div className="absolute left-0 top-0 w-4 h-full bg-green-600"></div>
        <div className="absolute left-6 top-12 w-3 h-20 bg-green-500 rounded-full"></div>
        <div className="absolute left-6 top-40 w-3 h-16 bg-green-400 rounded-full"></div>
        <div className="absolute left-6 bottom-32 w-3 h-24 bg-green-500 rounded-full"></div>

        {/* Certificate Content */}
        <div className="relative z-10 px-16 py-12 ml-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16rounded-full flex items-center justify-center">
                <div className="text-white text-xs font-bold">
                    <Image
                        width={70}
                        height={70}
                        src={logo}
                        alt="logo"
                    />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Mind Miracles</div>
                <div className="text-xs text-gray-500">Heal A Little Every Day</div>
              </div>
            </div>
            <div className="text-right text-xs text-gray-600">
              <div>(Registered under GHA:</div>
              <div>MAH/202200223(1))</div>
              <div>In/Qu. No: IN/MH/0214).</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-2">MIND MIRACLES</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">MENTAL HEALTH CARE</h2>
            <h3 className="text-3xl font-bold text-gray-900">Certificate of Completion</h3>
          </div>

          <div className="text-left mb-6">
            <p className="text-lg text-gray-700">
              This is to certify that <span className="font-bold text-xl">{data.user.name}</span>
            </p>
          </div>

          <div className="text-left mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              has successfully completed the <strong>{data.course.title}</strong> conducted by Mind Miracles
              Mental Health Care under the guidance of <strong>Ms. Sonali Khade (Psychologist & Hypnotherapist)</strong>{" "}
              This program focused on personal transformation, mental well-being, and self-improvement through
              structured techniques and expert-led sessions.
            </p>
          </div>

          <div className="flex justify-between items-end">
            {/* Certificate details */}
            <div className="text-left">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Date of Completion:</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Certificate ID:</span> {data.certificationId}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 mx-8">
              <Image
              width={50}
              height={50}
                src={img}
                alt="Mental Health Illustration"
                className="w-48 h-28 object-contain"
              />
            </div>

            <div className="text-right">
              <div className="mb-2">
                <div className="text-xl font-script text-gray-700 mb-2" style={{ fontFamily: "cursive" }}>
                  Ms. Sonali Khade
                </div>
                <div className="w-40 h-px bg-gray-300 ml-auto mb-1"></div>
                <div className="text-sm font-medium text-gray-700">Ms. Sonali Khade</div>
                <div className="text-xs text-gray-600">Psychologist, Director of Mind Miracles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-900 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          {/* Left branding */}
          <div>
            <div className="text-3xl font-bold text-green-400">Mind Miracles</div>
            <div className="text-sm text-gray-400">Mental Health Care</div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Button onClick={handleDownload} className="bg-white text-gray-900 hover:bg-gray-100">
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
