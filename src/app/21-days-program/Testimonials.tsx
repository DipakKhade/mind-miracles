'use client';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Quote, Sparkles, Users2 } from 'lucide-react';

const highlights = [
  {
    icon: Sparkles,
    title: 'वैयक्तिक परिवर्तन',
    description:
      'अनेक सहभागींनी व्यक्त केले की कार्यक्रमामुळे त्यांना वैयक्तिक आव्हानांवर मात करण्यास, सोशल मीडियाच्या व्यसनातून बाहेर पडण्यास आणि तणाव व्यवस्थापित करण्यास मदत झाली.',
  },
  {
    icon: Heart,
    title: 'आत्मस्वीकृती',
    description:
      'सत्रांनी सहभागींना स्वतःला स्वीकारण्यास, स्व-प्रेमाचा सराव करण्यास आणि त्यांचा वैयक्तिक प्रवास मौल्यवान आहे हे समजण्यास शिकवले.',
  },
  {
    icon: MessageCircle,
    title: 'भावनिक आधार',
    description:
      'सहभागींना ऐकले आणि समजले गेले असे वाटले. त्यांनी मा. सोनाली खाडे यांचे वर्णन एका विश्वासार्ह मार्गदर्शक आणि शक्तीचा स्रोत म्हणून केले.',
  },
  {
    icon: Users2,
    title: 'कुटुंबावर परिणाम',
    description:
      'एका सहभागीने नमूद केले की सत्रांचा फायदा त्यांना तर झालाच, शिवाय त्यांच्या जोडीदाराला आणि मुलालाही झाला, जे ऐकण्यासाठी सहभागी झाले होते.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-white to-emerald-50/60 px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            सहभागींचे अनुभव
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#003C2F] md:text-4xl">
            कार्यक्रमातील{' '}
            <span className="text-green-600">सहभागींचे म्हणणे</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            21 Days Life Changing Program मधील सहभागींनी आत्मशोध, मानसिक आरोग्य
            आणि वैयक्तिक वाढीचा अनुभव कसा घेतला.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Quote className="absolute -right-4 -top-4 h-24 w-24 text-green-50 transition-colors duration-300 group-hover:text-green-100" />
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg shadow-green-500/30">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#003C2F]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-800 p-8 text-center text-white md:p-12"
        >
          <Quote className="mx-auto mb-4 h-10 w-10 text-green-200" />
          <p className="mx-auto max-w-3xl text-xl font-medium leading-relaxed md:text-2xl">
            &quot;स्वतःला समजून घेण्याचा प्रवास कधीच संपत नाही. कार्यक्रमाचे
            ध्येय जीवनातील आव्हानांकडे एक नवीन दृष्टिकोन देणे हे आहे.&quot;
          </p>
          <div className="mt-6">
            <p className="text-lg font-bold">- मा. सोनाली खाडे</p>
            <p className="text-sm text-white/80">संस्थापिका, Mind Miracles</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
