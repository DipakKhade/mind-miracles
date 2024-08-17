'use client';
import Image from "next/image";
import logo from "../../public/mind_miracles_logo.png";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Hero() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };
  return (
    <>
    <motion.div
        initial={{ opacity: 0.8, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
      <main className="min-h-[420px] md:flex">
        <div className="flex justify-center ">
          <div>
            <Image
              alt="mindmiracles"
              src={logo}
              className="w-60 h-60 md:w-[700px] md:h-[450px]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle">
          <div className="text-2xl md:text-4xl p-4 md:p-12 font-semibold text-center">
            <p className="font-mono">
              We are the healing hand you&apos;ve always yearned for but
              couldn&apos;t catch!
            </p>
          </div>
          <div className="flex justify-end text-2xl font-bold p-2">
            <p>~Mind Miracles</p>
          </div>
        </div>
      </main>

      
      </motion.div>
    </>
  );
}
