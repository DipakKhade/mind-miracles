'use client';

import { Button } from '@/components/ui/button';
import { Download, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import img from '../../public/certbimg.png';
import logo from '../../public/mind_miracles_logo.png';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as htmlToImage from 'html-to-image';

interface certificationData {
  course: {
    title: string;
  };
  user: {
    name: string;
  };
  certificationId: string;
}

export default function CertificateComponent({
  courseId,
}: {
  courseId: string;
}) {
  const [data, SetData] = useState<certificationData>();

  useEffect(() => {
    const getCertificateInfo = async () => {
      toast.loading('loading...', {
        position: 'top-center',
      });
      const response = await fetch(
        `/api/certificate_data?courseId=${courseId}`,
      );
      const data = await response.json();
      console.log(data.data);
      SetData(data.data);
      toast.dismiss();
    };

    getCertificateInfo();
  }, []);


  const handleDownload = () => {
    htmlToImage
  .toJpeg(document.getElementById('cert')!, { quality: 0.95 })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'my-image-name.jpeg';
    link.href = dataUrl;
    link.click();
  });
  };

  if (!data) {
    return <></>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Certificate Container */}
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
        <div className="absolute left-0 top-0 h-full w-4 bg-green-600"></div>
        <div className="absolute left-6 top-12 h-20 w-3 rounded-full bg-green-500"></div>
        <div className="absolute left-6 top-40 h-16 w-3 rounded-full bg-green-400"></div>
        <div className="absolute bottom-32 left-6 h-24 w-3 rounded-full bg-green-500"></div>

        {/* Certificate Content */}
        <div className="relative z-10 ml-8 px-16 py-12" id='cert'>
          <div className="mb-8 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16rounded-full flex w-16 items-center justify-center">
                <div className="text-xs font-bold text-white">
                  <Image width={70} height={70} src={logo} alt="logo" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Mind Miracles
                </div>
                <div className="text-xs text-gray-500">
                  Heal A Little Every Day
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-gray-600">
              <div>(Registered under GHA:</div>
              <div>MAH/202200223(1))</div>
              <div>In/Qu. No: IN/MH/0214).</div>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-green-700">
              MIND MIRACLES
            </h1>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              MENTAL HEALTH CARE
            </h2>
            <h3 className="text-3xl font-bold text-gray-900">
              Certificate of Completion
            </h3>
          </div>

          <div className="mb-6 text-left">
            <p className="text-lg text-gray-700">
              This is to certify that{' '}
              <span className="text-xl font-bold">{data.user.name}</span>
            </p>
          </div>

          <div className="mb-12 text-left">
            <p className="text-lg leading-relaxed text-gray-700">
              has successfully completed the{' '}
              <strong>{data.course.title}</strong> conducted by Mind Miracles
              Mental Health Care under the guidance of{' '}
              <strong>Ms. Sonali Khade (Psychologist & Hypnotherapist)</strong>{' '}
              This program focused on personal transformation, mental
              well-being, and self-improvement through structured techniques and
              expert-led sessions.
            </p>
          </div>

          <div className="flex items-end justify-between">
            {/* Certificate details */}
            <div className="text-left">
              <div className="mb-4">
                <div className="mb-2 text-sm text-gray-600">
                  <span className="font-medium">Date of Completion:</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Certificate ID:</span>{' '}
                  {data.certificationId}
                </div>
              </div>
            </div>

            <div className="mx-8 flex-shrink-0">
              <Image
                width={50}
                height={50}
                src={img}
                alt="Mental Health Illustration"
                className="h-28 w-48 object-contain"
              />
            </div>

            <div className="text-right">
              <div className="mb-2">
                <div
                  className="font-script mb-2 text-xl text-gray-700"
                  style={{ fontFamily: 'cursive' }}
                >
                  Ms. Sonali Khade
                </div>
                <div className="mb-1 ml-auto h-px w-40 bg-gray-300"></div>
                <div className="text-sm font-medium text-gray-700">
                  Ms. Sonali Khade
                </div>
                <div className="text-xs text-gray-600">
                  Psychologist, Director of Mind Miracles
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-gray-900 p-6 text-white">
        <div className="flex items-center justify-between">
          {/* Left branding */}
          <div>
            <div className="text-3xl font-bold text-green-400">
              Mind Miracles
            </div>
            <div className="text-sm text-gray-400">Mental Health Care</div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleDownload}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
