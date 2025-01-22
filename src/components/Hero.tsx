'use client';
import Image from 'next/image';
import logo from '../../public/mind_miracles_logo.png';
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.8, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <main className="min-h-[420px] md:flex">
          <div className="flex justify-center">
            <div>
              <Image
                alt="mindmiracles"
                src={logo}
                className="h-60 w-60 md:h-[450px] md:w-[700px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <div className="p-4 text-center text-2xl font-semibold md:p-12 md:text-4xl">
              <p className="font-mono">
                We Are Helping Hands You Have Been Searching For
              </p>
            </div>
            <div className="flex justify-end p-2 text-2xl font-bold">
              <p>~Mind Miracles</p>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
}
