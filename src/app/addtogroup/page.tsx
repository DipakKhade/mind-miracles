'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export default function PayPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    if (!phone || phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/createOrder', {
      method: 'POST',
      body: JSON.stringify({ amount: 100 }),
    });
    const data = await res.json();
    const options = {
      key: process.env.key_id,
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
      name: 'Mind Miracles',
      description: 'Join WhatsApp Group',
      handler: async (response: any) => {
        const res = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await res.json();
        if (data.isOk) {
          toast.success('Payment successful! Admin has been notified.');
          const sendMessage = await fetch('api/adduser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone,
              razorpay_payment_id: response.razorpay_payment_id
            }),
          });
          setPhone('');
          router.push('/');
        } else {
          toast.error('error occured while processing. please contact admin');
        }
      },
      prefill: { contact: phone || '' },
      theme: { color: '#3399cc' },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-7 w-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Mind Miracles Premium
              </h2>
              <p className="text-gray-600">Exclusive WhatsApp Group</p>
            </div>
          </div>
          <div className="max-w-md rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-800">
              🎯 Get exclusive tips, strategies, and daily motivation
              <br />
              💡 Connect with like-minded individuals
              <br />
              📈 Access premium content and resources
            </p>
          </div>
        </div>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your WhatsApp number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              This number will be added to the WhatsApp group
            </p>
          </div>

          <div className="text-center">
            <h1 className="mb-4 text-xl font-semibold text-gray-800">
              Pay ₹99 to Join Group
            </h1>
            <button
              className="w-full rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={startPayment}
              disabled={loading || !phone}
            >
              {loading ? 'Processing...' : 'Pay ₹99 & Join Group'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
