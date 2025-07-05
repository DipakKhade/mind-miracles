'use client';
import Image from 'next/image';
import logo from '../../public/mind_miracles_logo.png';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
            {/* <div className="flex justify-end p-2 text-2xl font-bold">
              <p>~Mind Miracles</p>
            </div> */}

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Expert psychological healing and hypnotherapy services to help you
              achieve mental wellness and personal growth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/courses"
                className="rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Explore Our Programs
              </Link>
              <Link
                href="/test"
                className="text-sm font-semibold leading-6 text-gray-900 transition-colors duration-300 hover:text-green-600"
              >
                Take Mental Health Test{' '}
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
}
