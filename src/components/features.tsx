'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Heart, Sparkles, Target } from 'lucide-react';

const features = [
  {
    name: 'Expert Guidance',
    description:
      'Professional support from experienced psychologists and therapists',
    icon: BrainCircuit,
  },
  {
    name: 'Personalized Care',
    description: 'Tailored approaches to meet your unique mental health needs',
    icon: Heart,
  },
  {
    name: 'Holistic Healing',
    description: 'Comprehensive programs addressing mind, body, and spirit',
    icon: Sparkles,
  },
  {
    name: 'Goal-Oriented',
    description:
      'Focused strategies to help you achieve your personal objectives',
    icon: Target,
  },
];

export function Features() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-green-600/20 bg-green-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            Our Approach
          </span>
          <p className="mt-4 text-3xl font-bold tracking-tight text-[#003C2F] sm:text-4xl">
            Everything you need for mental wellness
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-2xl border border-green-900/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-600/20 hover:shadow-xl hover:shadow-green-900/10"
            >
              <dt>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-teal-700 shadow-lg shadow-green-600/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <feature.icon
                    className="h-7 w-7 text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-lg font-bold leading-7 text-[#003C2F]">
                  {feature.name}
                </span>
              </dt>
              <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-[#003C2F]/70">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
