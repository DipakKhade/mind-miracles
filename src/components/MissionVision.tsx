import React from 'react';
import Image from 'next/image';
import m1 from '../../public/mission1.jpg'
import m2 from '../../public/mission2.jpg'
const MissionVision = () => {
  return (
    <div className="p-8">
      <div className="text-4xl font-bold text-teal-900 mb-8">OUR MISSION & VISION</div>
      
      <div className="flex flex-col space-y-8">

        {/* Mission Section */}
        <div className='md:pl-[20vw]'>
             
        <div className="flex items-center bg-teal-100 p-8 rounded-lg shadow-lg md:w-[70vw] justify-end">
          <div className="w-1/4">
          <Image
          src={m1}
          height={200}
          width={150}
          alt=''
          className='rounded-full'
          />
          </div>
          <div className="w-3/4 pl-8">
            <h2 className="text-2xl font-bold text-teal-900">Our Mission</h2>
            <p className="text-teal-800 mt-4">
              Our mission is to inspire individuals to prioritize their mental health and well-being through accessible and transformative hypnotherapy services. We are dedicated to helping people embrace life to the fullest, making every moment count before they die.
            </p>
          </div>
        </div>
          </div>


        {/* Vision Section */}
        <div className='md:pr-[20vw]'>

        
        <div className="flex items-center bg-teal-100 p-8 rounded-lg shadow-lg md:w-[70vw]">
          <div className="w-3/4 pr-8">
            <h2 className="text-2xl font-bold text-teal-900">Our Vision</h2>
            <p className="text-teal-800 mt-4">
              Our vision is to empower and heal individuals, particularly the youth, by nurturing emotional and mental strength. Through compassionate care and guidance, we aim to create a resilient generation, ready to face life&apos;s challenges with confidence.
            </p>
          </div>
          <div className="w-1/4">
          <Image
          src={m2}
          height={200}
          width={150}
          alt=''
          className='rounded-full'
          />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
