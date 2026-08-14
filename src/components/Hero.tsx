'use client';
import Image from 'next/image';
import logo from '../../public/mind_miracles_logo.png';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <main className="mx-auto flex min-h-[420px] max-w-7xl flex-col items-center gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:gap-12 md:py-16 lg:px-8">
          <div className="flex w-full justify-center md:w-auto md:flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            >
              <Image
                alt="mindmiracles"
                src={logo}
                className="h-44 w-44 drop-shadow-2xl sm:h-60 sm:w-60 md:h-[380px] md:w-[420px] lg:h-[450px] lg:w-[500px]"
                priority
              />
            </motion.div>
          </div>

          <div className="flex w-full max-w-2xl flex-col justify-center text-center md:w-auto md:flex-1 md:items-start md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-green-600/20 bg-green-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                Trusted since 2019
              </span>
            </motion.div>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#003C2F] sm:text-4xl md:text-5xl">
              We Are Helping Hands You Have Been Searching For
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#003C2F]/70 sm:text-lg md:text-xl">
              Expert psychological healing and hypnotherapy services to help you
              achieve mental wellness and personal growth.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30"
              >
                Explore Our Programs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/test"
                className="inline-flex items-center justify-center gap-1 rounded-full px-5 py-3.5 text-sm font-semibold text-[#003C2F] transition-colors duration-300 hover:text-green-600"
              >
                Take Mental Health Test
                <span aria-hidden="true" className="text-green-600">
                  →
                </span>
              </Link>
            </div>
          </div>
        </main>
      </motion.div>
    </section>
  );
}
