'use client';
import { motion } from 'framer-motion';
import { Brain, Heart, Shield, Sparkles, Target, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: 'मानसिक स्पष्टता',
    description:
      'विचारांमध्ये आणि निर्णय घेण्यात तीव्र लक्ष आणि स्पष्टता मिळवा.',
  },
  {
    icon: Heart,
    title: 'भावनिक संतुलन',
    description:
      'भावनिक स्थैर्य मिळवा आणि आत्मविश्वासाने परिस्थितीला सामोरे जा.',
  },
  {
    icon: Shield,
    title: 'तणावमुक्ती',
    description:
      'तणाव कायमस्वरूपी कमी करण्यासाठी प्रभावी तंत्रे शिका आणि व्यवस्थापित करा.',
  },
  {
    icon: Sparkles,
    title: 'आंतरिक शांती',
    description: 'तुमच्या दैनंदिन जीवनात खोल आंतरिक शांती आणि समाधान अनुभवा.',
  },
  {
    icon: Target,
    title: 'ध्येय साध्य',
    description:
      'तुमची वैयक्तिक आणि व्यावसायिक ध्येये साध्य करण्यासाठी मानसिकता आणि साधने विकसित करा.',
  },
  {
    icon: Zap,
    title: 'ऊर्जा आणि जोम',
    description:
      'तुमची ऊर्जा पातळी पुन्हा भरा आणि अधिक जिवंत आणि उत्साही वाटू लागा.',
  },
];

export default function ProgramBenefits() {
  return (
    <section className="bg-gradient-to-b from-green-50/70 to-white px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            परिवर्तनकारी फायदे
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#003C2F] md:text-4xl">
            तुम्हाला काय मिळेल
            <span className="text-green-600"> फायदा</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            २१ दिवसांत, तुम्ही तुमच्या जीवनातील प्रत्येक पैलू बदलणारी कौशल्ये
            आणि मानसिक बदल विकसित कराल.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-50 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-100" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg shadow-green-500/30">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003C2F]">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
