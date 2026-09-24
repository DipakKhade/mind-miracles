'use client';
import { motion } from 'framer-motion';

export default function InfoVideo() {
  return (
    <section className="bg-gradient-to-br from-teal-700 to-emerald-900 px-4 py-16 md:py-20">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            माहितीपर व्हिडिओ
          </span>
          <h2 className="mb-6 mt-4 text-3xl font-bold text-white md:text-4xl">
            कार्यक्रमाबद्दल अधिक जाणून घ्या
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-white/80">
            हा व्हिडिओ पाहून या २१ दिवसांच्या महत्त्वाच्या प्रवासाबद्दल आणि
            तुमच्या जीवनात त्याचा कसा फायदा होईल याबद्दल जाणून घ्या.
          </p>
          <div className="aspect-video overflow-hidden rounded-2xl bg-black/10 shadow-2xl shadow-green-900/40 ring-4 ring-white/10">
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
