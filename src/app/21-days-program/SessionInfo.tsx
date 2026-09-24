'use client';
import { motion } from 'framer-motion';
import { Clock, MonitorPlay, PhoneCall } from 'lucide-react';

export default function SessionInfo() {
  return (
    <section className="bg-white px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="flex items-start gap-5 rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-8">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg shadow-green-500/30">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-[#003C2F]">
                दररोज सत्र
              </h3>
              <p className="text-gray-600">
                सत्र दररोज रात्री{' '}
                <span className="font-semibold text-green-700">९:०० वाजता</span>{' '}
                Zoom वर आयोजित केली जातात.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5 rounded-3xl border border-green-100 bg-gradient-to-br from-teal-50 to-white p-8">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/30">
              <MonitorPlay className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-[#003C2F]">
                चुकलेल्या सत्राचे रेकॉर्डिंग
              </h3>
              <p className="text-gray-600">
                जर एखादी सत्र चुकले असेल तर टीमकडून{' '}
                <span className="font-semibold text-teal-700">
                  क्लास रेकॉर्डिंग
                </span>{' '}
                प्रदान केली जाते.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
              <PhoneCall className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-[#003C2F]">
                कोणतीही शंका / अधिक माहितीसाठी
              </h3>
              <p className="text-gray-600">
                प्रश्न, शंका किंवा अधिक माहितीसाठी संपर्क साधा:
                <a
                  href="tel:7020053425"
                  className="mt-2 block text-lg font-bold text-[#003C2F] transition-colors hover:text-emerald-600"
                >
                  <span className="font-semibold text-emerald-600">
                    7020053425
                  </span>{' '}
                  - कॉल करा
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
