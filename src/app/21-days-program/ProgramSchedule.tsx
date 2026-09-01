'use client';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, Video } from 'lucide-react';

const schedule = [
  {
    week: 'आठवडा १',
    title: 'पाया आणि जागरूकता',
    description:
      'मूलभूत ध्यान तंत्रे, आत्मजागरूकता व्यायाम आणि प्रास्ताविक हिप्नोथेरपी सत्रांद्वारे एक मजबूत पाया तयार करा.',
    highlights: [
      'दररोज ध्यान सराव',
      'आत्मजागरूकता जर्नलिंग',
      'हिप्नोथेरपीची ओळख',
      'तणाव व्यवस्थापन मूलभूत',
    ],
  },
  {
    week: 'आठवडा २',
    title: 'खोल उपचार आणि परिवर्तन',
    description:
      'भावनिक उपचार, प्रगत ध्यान तंत्रे आणि चिरस्थायी बदलासाठी वैयक्तिक हिप्नोथेरपी सत्रांमध्ये खोलवर जा.',
    highlights: [
      'प्रगत हिप्नोथेरपी',
      'भावनिक मुक्ती तंत्रे',
      'अवचेतन पुनर्प्रोग्रामिंग',
      'आंतरिक मुलाचे उपचार',
    ],
  },
  {
    week: 'आठवडा ३',
    title: 'एकत्रीकरण आणि सक्षमीकरण',
    description:
      'तुमचे शिक्षण एकत्रित करा, टिकाऊ सवयी विकसित करा आणि सतत वाढीसाठी वैयक्तिक कृती योजना तयार करा.',
    highlights: [
      'वैयक्तिक कृती योजना',
      'टिकाऊ सवय निर्मिती',
      'प्रगत व्हिज्युअलायझेशन',
      'पदवी सोहळा',
    ],
  },
];

const programIncludes = [
  { icon: Video, label: 'लाइव्ह दैनिक सत्रे' },
  { icon: BookOpen, label: 'सराव वर्कशीट्स' },
  { icon: Calendar, label: '२१-दिवसांची रचना' },
  { icon: Clock, label: 'लवचिक वेळ' },
];

export default function ProgramSchedule() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            कार्यक्रम रचना
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#003C2F] md:text-4xl">
            तुमचा २१-दिवसांचा
            <span className="text-green-600"> प्रवास</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            तीन परिवर्तनकारी आठवड्यांमध्ये विभागलेला काळजीपूर्वक रचलेला कार्यक्रम,
            प्रत्येक आठवडा मागील आठवड्यावर आधारित.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programIncludes.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50/50 p-5"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
                <item.icon className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-semibold text-[#003C2F]">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          {schedule.map((week, index) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex w-full flex-col justify-center bg-gradient-to-br from-green-600 to-teal-700 p-8 text-white md:w-72">
                  <span className="text-sm font-medium opacity-80">
                    {week.week}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold">{week.title}</h3>
                </div>
                <div className="flex-1 p-8">
                  <p className="mb-6 text-gray-600">{week.description}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {week.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
