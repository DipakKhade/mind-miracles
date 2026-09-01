'use client';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const features = [
  {
    title: 'दररोज मार्गदर्शित सत्रे',
    description:
      'हिप्नोथेरपी, ध्यान आणि मानसशास्त्रीय तंत्रे एकत्र करून काळजीपूर्वक तयार केलेल्या दररोजच्या सत्रांमध्ये सहभागी व्हा.',
  },
  {
    title: 'वैयक्तिक दृष्टिकोन',
    description:
      'तुमच्या विशिष्ट गरजा आणि ध्येयांनुसार वैयक्तिक लक्ष आणि सानुकूल मार्गदर्शन मिळवा.',
  },
  {
    title: 'तज्ज्ञ हिप्नोथेरपी',
    description:
      'प्रमाणित तज्ज्ञांद्वारे वापरली जाणारी व्यावसायिक हिप्नोथेरपी तंत्रे शिका आणि अनुभवा.',
  },
  {
    title: 'ध्यान आणि माइंडफुलनेस',
    description:
      'सर्व अनुभव पातळींसाठी योग्य अशा मार्गदर्शित सत्रांसह एक मजबूत ध्यान सराव विकसित करा.',
  },
  {
    title: 'भावनिक उपचार',
    description:
      'तुम्हाला यशापासून रोखणाऱ्या खोलवर रुजलेल्या भावनिक पॅटर्न ओळखा आणि सोडवा.',
  },
  {
    title: 'आजीवन प्रवेश',
    description:
      'सर्व कार्यक्रम साहित्य, रेकॉर्डिंग आणि संसाधनांपर्यंत सतत वाढीसाठी आजीवन प्रवेश मिळवा.',
  },
];

export default function ProgramDetails() {
  return (
    <section id="details" className="bg-white px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            कार्यक्रमाबद्दल
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#003C2F] md:text-4xl">
            या कार्यक्रमाला काय बनवते
            <span className="text-green-600"> खास?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            आव्हानांवर मात करण्यासाठी आणि तुमची पूर्ण क्षमता उजागर करण्यासाठी
            तुम्हाला परिवर्तनकारी प्रवासात मार्गदर्शन करण्यासाठी आमचा २१
            दिवसांचा कार्यक्रम काळजीपूर्वक तयार करण्यात आला आहे.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-green-100 bg-gradient-to-br from-green-50/50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 transition-colors duration-300 group-hover:bg-green-600">
                <CheckCircle2 className="h-6 w-6 text-green-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#003C2F]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl bg-gradient-to-br from-green-600 to-teal-700 p-8 text-white md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">
                या कार्यक्रमात कोणी सहभागी व्हावे?
              </h3>
              <p className="mt-4 opacity-90">
                हा कार्यक्रम वैयक्तिक वाढ, भावनिक उपचार आणि जीवनात चिरस्थायी
                परिवर्तन शोधणाऱ्या प्रत्येकासाठी आदर्श आहे.
              </p>
            </div>
            <div className="space-y-3">
              {[
                'वैयक्तिक विकास शोधणाऱ्या व्यक्ती',
                'तणाव आणि चिंता हाताळणारे लोक',
                'नातेसंबंध सुधारू इच्छिणारे',
                'भावनिक संतुलन शोधणारे कोणीही',
                'ध्यान आणि माइंडफुलनेसमध्ये स्वारस्य असलेले लोक',
                'करिअर स्पष्टता आणि लक्ष शोधणारे लोक',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
