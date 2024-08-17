"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import Image from "next/image";
import weweare_logo from "../../public/who_we_are.png";
import { LampContainer } from "./ui/lamp";
import img from '../../public/whoweare.png'

export default function WhoWeAre() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
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
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br text-slate-50 from-slate-300 to-green-500 py-4 bg-clip-text text-center  font-medium tracking-tight text-transparent"
        >
          <div className="md:flex justify-around" id="about">
          
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="text-4xl md:text-5xl font-mono md:pt-12 text-green-900">WHO ARE WE ?</div>

              <div>
                <div className="flex justify-center">
                  <Image
                    alt="mindmiracles"
                    src={weweare_logo}
                    height={700}
                    width={500}
                  />
                </div>

              </div>
            </div>
          </div>



          <div className="md:w-[500px] md:pt-24 md:text-2xl text-teal-800 pt-4 text-base/loose">
          Mind Miracles is a dedicated Hypnotherapy and healing center established in 2019, focused on empowering the mental health of society, particularly the youth. We offer expert Hypnotherapy and counseling services to address your mental, emotional, and educational needs with care and expertise.
          </div>
          </div>
          <div>
          </div>
        </motion.h1>
      </motion.div>
    </>
  );
}


