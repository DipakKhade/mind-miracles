'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import Image from 'next/image';
import weweare_logo from '../../public/who_we_are.png';

export default function WhoWeAre() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="pb-12 pt-12"
      >
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <div
            className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-16"
            id="about"
          >
            <div className="flex flex-col items-center md:items-start">
              <span className="inline-flex items-center rounded-full border border-green-600/20 bg-green-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
                About Us
              </span>
              <h2 className="mt-4 text-center text-4xl font-bold tracking-tight text-green-900 md:text-start md:text-5xl">
                WHO ARE WE ?
              </h2>
              <div className="mt-6 flex justify-center">
                <Image
                  alt="mindmiracles"
                  src={weweare_logo}
                  height={560}
                  width={400}
                  className="rounded-3xl object-cover shadow-2xl shadow-green-900/20"
                />
              </div>
            </div>

            <div className="w-full max-w-xl text-center text-base leading-relaxed text-teal-800 md:text-start md:text-xl md:leading-loose">
              Mind Miracles is a dedicated center for psychological healing and
              Hypnotherapy, established in 2019, focused on enhancing mental
              health, especially for the youth. We specialize in psychological
              therapies, relaxation techniques, and counseling to address a wide
              range of mental, emotional, and behavioral needs with professional
              care and expertise.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
