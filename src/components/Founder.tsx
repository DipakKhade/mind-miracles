'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import founder_img from '../../public/founder_jpg.jpg';
import { Award, Users, Brain } from 'lucide-react';

const revealVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const highlights = [
  {
    icon: Users,
    label: 'Youth Counselor',
    sub: 'Personal & group counseling',
  },
  {
    icon: Brain,
    label: 'Hypnotherapist',
    sub: 'Mind & behavior therapy',
  },
  {
    icon: Award,
    label: 'Psychologist',
    sub: 'Testing & assessments',
  },
];

export default function Founder() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
        <div className="flex-1 text-center md:text-start">
          <span className="inline-flex items-center rounded-full border border-green-600/20 bg-green-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            Leadership
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-teal-900 md:text-6xl">
            Our Founder
          </h2>
          <p className="mt-6 text-2xl font-semibold text-teal-900">
            Ms. SONALI KHADE
          </p>
          <p className="mt-1 text-base text-teal-700">
            Psychologist and Hypnotherapist.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#003C2F]/80 md:text-lg md:leading-loose">
            Ms. Sonali Khade is a Psychologist and Hypnotherapist with extensive
            experience supporting the youth. Through personal and group
            counseling, mind power workshops, training programs, and
            psychological testing, she has empowered students and young
            professionals to overcome challenges and achieve their goals with
            compassion and expertise.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-green-900/5 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:items-start md:text-start"
              >
                <item.icon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm font-bold text-[#003C2F]">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#003C2F]/60">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:w-[38%]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-green-600/20 to-teal-700/20 blur-xl"
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-green-900/25 ring-4 ring-white/70">
              <Image
                src={founder_img}
                alt="Ms. Sonali Khade - Founder of Mind Miracles"
                width={480}
                height={560}
                className="h-auto w-full max-w-[300px] object-cover sm:max-w-[360px] md:max-w-none"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
