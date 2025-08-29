'use client';

import Script from 'next/script';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { registrationFormStateAtom } from '@/store';
import { Spinner } from './spinner';
import { getSession } from 'next-auth/react';

export const PayAndRegisterButton = ({
  course_id,
  amount_to_pay,
  disabled,
  isFormValid,
}: {
  course_id: string;
  amount_to_pay: number;
  disabled: boolean;
  isFormValid: boolean;
}) => {
  // const [amount, setAmount] = useState<number>(1499);
  const form_values = useRecoilValue(registrationFormStateAtom);
  const reaset_form_values = useResetRecoilState(registrationFormStateAtom);
  const [loading, SetLoading] = useState<boolean>(false);
  const router = useRouter();

  const amountToPay = amount_to_pay * 100; //for precision

  const createOrder = async () => {
    const session = await getSession();
    if (!session) {
      toast.warning('Please login first');
      return;
    }
    if (!isFormValid) {
      toast.warning('Please fill valid details...');
      return;
    }
    SetLoading(true);
    const res = await fetch('/api/createOrder', {
      method: 'POST',
      body: JSON.stringify({ course_id }),
    });
    const data = await res.json();

    const paymentData = {
      // key: 'rzp_test_Hbcvz6QTucu6XP', //process.env.key_id,
      key: process.env.key_id,
      order_id: data.id,
      handler: async function (response: any) {
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
          toast.success('Registration successful...');
          const resp = await fetch(`/api/purchase`, {
            method: 'POST',
            body: JSON.stringify({
              form_values,
              course_id,
              amountToPay: amountToPay,
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const res = await resp.json();
          if (res.id) {
            SetLoading(false);
            router.push('/purchases');
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
        disabled={!isFormValid}
        onClick={createOrder}
        type="submit"
        className="w-full bg-green-700 hover:bg-[#3a5a40]"
      >
        {loading ? <Spinner /> : 'Pay And Register'}
      </Button>
    </>
  );
};
