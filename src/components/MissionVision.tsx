import React from 'react';
import Image from 'next/image';
import m1 from '../../public/mission1.jpg'
import m2 from '../../public/mission2.jpg'
const MissionVision = () => {
  return (
    <div className="md:p-8 p-4">
      <div className="text-4xl md:text-6xl font-bold text-teal-900 mb-8 pl-4">OUR MISSION <span className='block md:inline-block pl-12 md:pl-0'>& VISION</span></div>
      
      <div className="flex flex-col space-y-8">

        {/* Mission Section */}
        <div className='md:pl-[20vw] pt-4'>
             
        <div className="md:flex items-center bg-teal-100 md:p-8 pb-3 rounded-lg shadow-lg md:w-[70vw] justify-end">
          <div className="md:w-1/4 flex justify-center pt-4">
          <Image
          src={m1}
          height={200}
          width={200}
          alt=''
          className='rounded-full p-2 object-none'
          />
          </div>
          <div className="md:w-3/4 p-6 md:pl-8">
            <h2 className="text-2xl font-bold text-teal-900 pl-10 md:pl-0">Our Mission</h2>
            <p className="text-teal-800 mt-4 text-center">
              Our mission is to inspire individuals to prioritize their mental health and well-being through accessible and transformative hypnotherapy services. We are dedicated to helping people embrace life to the fullest, making every moment count before they die.
            </p>
          </div>
        </div>
          </div>


        {/* Vision Section */}

        <div className='md:pr-[20vw]'>
             
             <div className="md:flex items-center bg-teal-100 md:p-8 pb-3 rounded-lg shadow-lg md:w-[70vw] justify-end">
              
               <div className="md:w-3/4 p-6 md:pl-8">
                 <h2 className="text-2xl font-bold text-teal-900 pl-10 md:pl-0">Our Vision</h2>
                 <p className="text-teal-800 mt-4 text-center">
                 Our mission is to inspire individual   s to prioritize their mental health and well-being through accessible and transformative hypnotherapy services. We are dedicated to helping people embrace life to the fullest, making every moment count before they die.
                 </p>
               </div>
               <div className="md:w-1/4 flex justify-center">
               <Image
          src={m2}
          height={200}
          width={200}
          alt=''
          className='rounded-full p-2 object-none'
          />
               </div>
             </div>
               </div>


  



       
      </div>
    </div>
  );
};

export default MissionVision;
