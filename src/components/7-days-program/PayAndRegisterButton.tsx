'use client';

import Script from 'next/script';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { courses } from '@/types';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { registrationFormStateAtom } from '@/store';

export const PayAndRegisterButton = ({
  course_name,
  amount_to_pay,
}: {
  course_name: courses;
  amount_to_pay: number;
}) => {
  // const [amount, setAmount] = useState<number>(1499);
  const form_values = useRecoilValue(registrationFormStateAtom);
  const reaset_form_values = useResetRecoilState(registrationFormStateAtom);
  const [loading, SetLoading] = useState<boolean>(false);
  const router = useRouter();

  const amountToPay = amount_to_pay * 100;

  const createOrder = async () => {
    SetLoading(true);
    console.log('recoil value s', form_values);
    const res = await fetch('/api/createOrder', {
      method: 'POST',
      body: JSON.stringify({ amount: amountToPay }),
    });
    const data = await res.json();
    const paymentData = {
      key: process.env.key_id,
      order_id: data.id,

      handler: async function (response: any) {
        // verify payment
        const res = await fetch('/api/verify', {
          method: 'POST',
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await res.json();
        if (data.isOk) {
          toast.success('Registration successfull');
          const response = await fetch(`/api/purchase`, {
            method: 'POST',
            body: JSON.stringify({
              form_values,
              course_name,
              amountToPay,
            }),
          });
          const res = await response.json();
          if (res.id) {
            SetLoading(false);
            router.push('/');
            toast.success('added to database');
            reaset_form_values();
          } else {
            SetLoading(false);
            toast.error(`Please Contact to Adminstrator`);
          }
        } else {
          alert('Payment failed');
        }
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
    SetLoading(false);
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button
        // disabled={!name || !email}
        onClick={createOrder}
        type="submit"
        className="w-full bg-green-700 hover:bg-[#3a5a40]"
      >
        {loading ? <Spinner /> : 'Pay And Register'}
      </Button>
    </>
  );
};

const Spinner = () => {
  return (
    <>
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline h-8 w-8 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};
