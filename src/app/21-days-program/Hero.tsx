'use client';
import { motion } from 'framer-motion';
import { Calendar, Video } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-teal-700 to-emerald-800 px-4 py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
            ७ ऑगस्ट २०२६ पासून सुरुवात
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-4xl font-bold drop-shadow-sm md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            21 Days Life Changing Program
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed opacity-90 md:text-xl"
        >
          तुमची खरी क्षमता उजागर करण्यासाठी, मनाला शांत करण्यासाठी आणि जीवनात
          चिरस्थायी सकारात्मक बदल घडवण्यासाठी तयार केलेला एक परिवर्तनकारी प्रवास.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium opacity-90"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>७ ऑगस्ट २०२६ पासून सुरू</span>
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
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-green-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-400 hover:text-green-900 hover:shadow-2xl"
          >
            आता नोंदणी करा
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#details"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold transition-all duration-300 hover:border-white/60 hover:bg-white/10"
          >
            अधिक जाणून घ्या
          </a>
        </motion.div>
      </div>
    </section>
  );
}
