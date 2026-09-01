'use client';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';
import { ArrowRight, Timer, Users, Video, Phone, User } from 'lucide-react';
import Script from 'next/script';

const PROGRAM_FEE = 1549;

const inputClasses =
  'w-full rounded-xl border border-green-200 bg-white px-4 py-3 text-base text-[#003C2F] shadow-sm transition-all duration-300 placeholder:text-green-600/50 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/40';

export default function RegistrationCTA() {
  const [loading, setLoading] = useState(false);

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string)?.trim();
    const whatsappNumber = (formData.get('whatsappNumber') as string)?.trim();

    if (!name || !whatsappNumber) {
      toast.warning('कृपया नाव आणि व्हॉट्सॲप नंबर भरा');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/21days/order', { method: 'POST' });
      const order = await res.json();

      if (!order.id) {
        throw new Error('Order creation failed');
      }

      const paymentData = {
        key: order.key_id,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: 'Mind Miracles',
        description: '21 Days Life Changing Program',
        prefill: {
          name,
          contact: whatsappNumber,
        },
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/21days/verify', {
            method: 'POST',
            body: JSON.stringify({
              name,
              whatsappNumber,
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.isOk) {
            toast.success('नोंदणी यशस्वी! धन्यवाद.', {
              description: 'आम्ही लवकरच तुमच्याशी संपर्क करू.',
            });
          } else {
            toast.error(verifyData.message || 'नोंदणी अयशस्वी');
          }
        },
      };
      const payment = new (window as any).Razorpay(paymentData);
      payment.on('payment.failed', function () {
        toast.error('पेमेंट अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
      });
      payment.open();
    } catch (error) {
      toast.error('कृपया पुन्हा प्रयत्न करा');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="register"
      className="relative overflow-hidden bg-gradient-to-br from-green-700 via-teal-800 to-emerald-900 px-4 py-16 text-white md:py-24"
    >
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            आजच नोंदणी करा
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            आजच तुमच परिवर्तन सुरू करा
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            आता तुमची जागा आरक्षित करा आणि नवीन, अधिक चांगल्या तुमच्याकडे पहिलं
            पाऊल टाका.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium opacity-90">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              <span>कार्यक्रम ७ ऑगस्ट २०२६ पासून सुरू</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              <span>दररोज रात्री ९:०० वाजता Zoom वर</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>चुकलेल्या सत्राचे रेकॉर्डिंग मिळते</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="bg-gradient-to-r from-green-600 to-teal-700 px-8 py-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-white/80">
              21 Days Life Changing Program
            </p>
            <p className="mt-2 text-5xl font-bold text-white">₹{PROGRAM_FEE}</p>
            <p className="mt-1 text-sm text-white/80">
              एक-वेळ पेमेंट - संपूर्ण कार्यक्रम प्रवेश
            </p>
          </div>

          <form
            className="p-6 text-[#003C2F] sm:p-8"
            onSubmit={handlePayment}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                  पूर्ण नाव <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    name="name"
                    placeholder="तुमचे पूर्ण नाव"
                    type="text"
                    className={`${inputClasses} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                  व्हॉट्सॲप नंबर <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    name="whatsappNumber"
                    type="tel"
                    placeholder="१० अंकी मोबाईल नंबर"
                    className={`${inputClasses} pl-10`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span>सुरक्षित पेमेंट Razorpay द्वारे</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'प्रक्रिया होत आहे...' : `₹${PROGRAM_FEE} भरून नोंदणी करा`}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-white/80">
            कोणत्याही शंकेसाठी किंवा अधिक माहितीसाठी संपर्क साधा:{' '}
            <a
              href="tel:7020053425"
              className="font-bold text-white underline-offset-4 transition-colors hover:text-yellow-300 hover:underline"
            >
              7020053425
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
