import { Sparkles, ShieldCheck } from 'lucide-react';

export const FeeInfo = ({ feeAmount }: { feeAmount: number }) => {
  return (
    <>
      <section className="px-4 py-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-teal-800 p-10 shadow-2xl shadow-green-900/30">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"
            />
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-green-200" />
            <h2 className="text-3xl font-bold text-white">Program Fee</h2>
            <p className="mt-1 text-white/90">Investment in your future</p>
            <div className="my-6 text-6xl font-bold text-white">
              ₹{feeAmount}
            </div>
            <p className="text-white/90">
              One-time payment for complete program access
            </p>
            <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4" />
              Secure payment via Razorpay
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
