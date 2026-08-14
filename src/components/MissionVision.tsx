import React from 'react';
import Image from 'next/image';
import m2 from '../../public/mission2.jpg';
const MissionVision = () => {
  return (
    <div className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full border border-green-600/20 bg-green-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
          Our Purpose
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-teal-900 md:text-6xl">
          VISION
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl bg-teal-100 shadow-xl shadow-teal-900/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-teal-900/15 md:flex md:items-center md:p-10 lg:mr-[10vw]">
        <div className="flex-1 p-8 md:p-4 md:pl-6">
          <h3 className="text-2xl font-bold text-teal-900">Our Vision</h3>
          <p className="mt-4 text-base leading-relaxed text-teal-800 md:text-lg">
            We aim to help the youth improve their mental, emotional, and
            psychological health, building a strong and confident generation
            ready to handle life&apos;s challenges.
          </p>
        </div>
        <div className="flex justify-center pb-8 md:w-[30%] md:pb-0">
          <Image
            src={m2}
            height={220}
            width={220}
            alt="Vision illustration"
            className="rounded-full object-cover p-1 ring-4 ring-white/60"
          />
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
