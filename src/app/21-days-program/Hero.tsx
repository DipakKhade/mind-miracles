'use client';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Video } from 'lucide-react';
import { formatStartDate } from '@/lib/marathi-date';

interface HeroProps {
  batchNo?: number;
  startDate?: string;
}

export default function Hero({ batchNo, startDate = '' }: HeroProps) {
  const formattedStartDate = formatStartDate(startDate);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50/80 to-white px-4 py-20 text-[#003C2F] md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/40 blur-3xl"
      />

      <div className="container relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2 text-sm font-medium text-green-800 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {batchNo ? `बॅच ${batchNo}` : '21 Days Program'}
            {formattedStartDate && ` | ${formattedStartDate} पासून सुरुवात`}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-4xl font-bold drop-shadow-sm md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            21 Days Life Changing Program
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
        >
          तुमची खरी क्षमता उजागर करण्यासाठी, मनाला शांत करण्यासाठी आणि जीवनात
          चिरस्थायी सकारात्मक बदल घडवण्यासाठी तयार केलेला एक परिवर्तनकारी
          प्रवास.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-green-800"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>
              {formattedStartDate
                ? `${formattedStartDate} पासून सुरू`
                : 'लवकरच सुरू होत आहे'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            <span>दररोज रात्री ९:०० वाजता Zoom वर</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#register"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-2xl"
          >
            Book Now
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=917020053425&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-green-200 bg-white px-8 py-4 text-base font-semibold text-green-800 transition-all duration-300 hover:border-green-400 hover:bg-green-50"
          >
            <MessageCircle className="h-5 w-5" />
            Message on Whatsapp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <div className="aspect-video overflow-hidden rounded-2xl bg-white shadow-2xl shadow-green-900/10 ring-4 ring-green-100">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/nk4u5MvJm4M"
              title="21 Days Life Changing Program"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="border-0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
