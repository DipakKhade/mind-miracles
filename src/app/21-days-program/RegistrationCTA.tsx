'use client';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';
import Script from 'next/script';
import { formatStartDate } from '@/lib/marathi-date';

interface RegistrationCTAProps {
  batchNo?: number;
  startDate?: string;
  fees?: string;
}

const inputClasses =
  'w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-base text-[#003C2F] transition-all duration-200 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10';

export default function RegistrationCTA({
  batchNo,
  startDate = '',
  fees = '',
}: RegistrationCTAProps) {
  const [loading, setLoading] = useState(false);
  const formattedStartDate = formatStartDate(startDate);
  const programFee = Number(fees) || 1549;

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
              batchNo,
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
      className="bg-gradient-to-b from-emerald-50/60 to-white px-4 py-16 md:py-24"
    >
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            आजच नोंदणी करा
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#003C2F] md:text-4xl">
            आजच तुमच परिवर्तन सुरू करा
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            आता तुमची जागा आरक्षित करा आणि नवीन, अधिक चांगल्या तुमच्याकडे पहिलं
            पाऊल टाका.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="grid overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-900/5 ring-1 ring-black/5 md:grid-cols-5"
        >
          <div className="flex flex-col bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-900 p-8 text-white md:col-span-2 md:p-10">
            <p className="text-sm font-medium uppercase tracking-wider text-white/70">
              21 Days Life Changing Program
            </p>
            <p className="mt-4 text-5xl font-bold">₹{programFee}</p>
            <p className="mt-1 text-sm text-white/70">
              एक-वेळ पेमेंट · संपूर्ण कार्यक्रम प्रवेश
            </p>

            {batchNo && (
              <span className="mt-6 inline-flex w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
                बॅच {batchNo}
              </span>
            )}

            <ul className="mt-8 space-y-4 text-sm text-white/90">
              <li className="flex items-center gap-3">
                <Calendar className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                <span>
                  {formattedStartDate
                    ? `${formattedStartDate} पासून सुरू`
                    : 'लवकरच सुरू होत आहे'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                <span>दररोज रात्री ९:०० वाजता Zoom वर</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                <span>चुकलेल्या सत्राचे रेकॉर्डिंग मिळते</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                <span>सुरक्षित पेमेंट Razorpay द्वारे</span>
              </li>
            </ul>

            <div className="mt-auto flex items-center gap-2 pt-8 text-xs text-white/60">
              <Video className="h-4 w-4 flex-shrink-0" />
              संपूर्ण कार्यक्रम मराठीमध्ये
            </div>
          </div>

          <div className="p-8 text-[#003C2F] md:col-span-3 md:p-10">
            <h3 className="text-2xl font-bold">नोंदणी करा</h3>
            <p className="mt-1 text-sm text-gray-500">
              खालील माहिती भरून पेमेंट पूर्ण करा.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handlePayment}>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                  पूर्ण नाव <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  placeholder="तुमचे पूर्ण नाव"
                  type="text"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                  व्हॉट्सॲप नंबर <span className="text-red-500">*</span>
                </label>
                <input
                  name="whatsappNumber"
                  type="tel"
                  placeholder="१० अंकी मोबाईल नंबर"
                  className={inputClasses}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 text-center text-base font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? 'प्रक्रिया होत आहे...'
                  : `₹${programFee} भरून नोंदणी करा`}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs leading-relaxed text-gray-400">
                कोणत्याही शंकेसाठी संपर्क साधा:{' '}
                <a
                  href="tel:7020053425"
                  className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  7020053425
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
