'use client';
import { motion } from 'framer-motion';
import founder_img from '../../public/founder.png'
import { StaticImageData } from 'next/image';
const revealVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

export default function Founder(){
  
    return<>
    <main className="p-4 md:flex">
        <div>
            <h4 className="text-4xl md:text-6xl font-bold text-teal-900">Our Founder</h4>
            <p className="text-xl font-semibold text-teal-900 pt-6">Ms. SONALI KHADE</p>
            <p className="indent-8 text-base/loose">Ms. Sonali Khade, a respected Clinical Hypnotherapy Counselor and mind coach, is renowned for her expertise in counseling and hypnotherapy. With her vast knowledge, she has empowered numerous professionals and students to achieve their goals by tapping into their subconscious potential. Ms. Khade compassionately supports individuals facing mental, emotional, and educational challenges, facilitating their healing and growth.</p>
        </div>

        <div className='md:w-[40vw]'>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh'}}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        style={{ width: '300px', height: '300px', overflow: 'hidden', borderRadius: '10px' }}
      >
        <motion.img
          src={founder_img.src}
          alt="Revealed Photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
        </div>


    </main>
    </>
}