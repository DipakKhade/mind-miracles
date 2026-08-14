'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import f1 from '../../public/footer-image-0.png';
import f2 from '../../public/footer-image-1.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { Phone, Mail, ArrowRight } from 'lucide-react';

const inputClasses =
  'w-full rounded-xl border border-green-200 bg-white px-4 py-3 text-base text-[#003C2F] shadow-sm transition-all duration-300 placeholder:text-green-600/50 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/40';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ms-sonali-khade-79b674331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    icon: FaLinkedinIn,
    hover: 'hover:bg-blue-600',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1DZRPYsPws/?mibextid=LQQJ4d',
    icon: IoLogoFacebook,
    hover: 'hover:bg-blue-700',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mind_miracles_/profilecard/?igsh=bXNxMjRrcnF2ZnMw',
    icon: FaInstagram,
    hover: 'hover:bg-pink-600',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@ms.sonaleepsychologist?si=S3x_G2-Z0zvzcx9n',
    icon: FaYoutube,
    hover: 'hover:bg-red-600',
  },
  {
    name: 'WhatsApp',
    href: 'https://api.whatsapp.com/send/?phone=917798082219&text&type=phone_number&app_absent=0',
    icon: FaWhatsapp,
    hover: 'hover:bg-green-600',
  },
];

export default function Register() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, SetLoading] = useState<boolean>(false);
  async function submitForm(data: any) {
    SetLoading(true);
    try {
      if (
        !data.firstName ||
        !data.lastName ||
        !data.mobileNo ||
        !data.email ||
        !data.age
      ) {
        SetLoading(false);
        toast.warning(`Please fill the form`);
        return;
      }
      const r = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const response = await r.json();
      SetLoading(false);
      if (response.success === true) {
        toast.success(response.message, {
          description: 'thanks for connecting',
        });
        reset();
      }
    } catch (e) {
      SetLoading(false);
      toast.warning('try again');
    }
    return;
  }
  return (
    <>
      <div
        id="contact"
        className="mx-auto mt-12 w-full max-w-7xl px-4 pb-4 sm:px-6 md:mt-24 lg:px-8"
      >
        <div className="overflow-hidden rounded-3xl bg-[#B6ECD5] shadow-2xl shadow-green-900/10 md:flex md:items-center md:justify-between">
          {/* Left info column */}
          <div className="p-8 md:w-[45%] md:p-14">
            <span className="inline-flex items-center rounded-full border border-green-700/20 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-800">
              Get in Touch
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#003C2F] md:text-6xl">
              CONTACT US
            </h2>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 text-green-700 shadow-sm">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-800/60">
                    Contact No
                  </p>
                  <a
                    href="tel:+917798082219"
                    className="text-lg font-semibold text-[#003C2F] transition-colors hover:text-green-700"
                  >
                    +91-779-808-2219
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 text-green-700 shadow-sm">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-800/60">
                    Email ID
                  </p>
                  <a
                    href="mailto:mindmiracles1707@gmail.com"
                    className="break-all text-lg font-semibold text-[#003C2F] transition-colors hover:text-green-700"
                  >
                    mindmiracles1707@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#003C2F] shadow-md transition-all duration-300 hover:-translate-y-1 hover:text-white ${social.hover}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <div className="mt-10 hidden md:block">
              <FooterAnimationImages />
            </div>
          </div>

          {/* Right form column */}
          <div className="bg-white/70 px-4 pb-8 pt-6 backdrop-blur-sm md:w-[55%] md:p-10 lg:p-14">
            <form
              className="rounded-3xl bg-white p-5 shadow-xl shadow-green-900/10 sm:p-8"
              onSubmit={handleSubmit(submitForm)}
            >
              <h3 className="mb-6 text-2xl font-bold text-[#003C2F]">
                Ready to begin your journey?
              </h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      placeholder="Enter first name"
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      placeholder="Enter last name"
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                      Mobile Number
                    </label>
                    <input
                      {...register('mobileNo')}
                      type="number"
                      placeholder="Enter 10 digit mobile number"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                      Email ID
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Enter email ID"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                      Age
                    </label>
                    <input
                      {...register('age')}
                      type="number"
                      placeholder="Enter your age"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#003C2F]/80">
                      Place
                    </label>
                    <input
                      {...register('place')}
                      placeholder="Enter Place"
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {loading ? (
                  <button
                    type="submit"
                    disabled
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-green-600/30"
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline h-5 w-5 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
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
                    Submitting...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl"
                  >
                    Submit
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function FooterAnimationImages() {
  return (
    <div style={{ position: 'relative', width: '360px', height: '360px' }}>
      <Image src={f1} alt="" width={360} height={360} />
      <motion.div
        style={{ position: 'absolute', top: 38, left: 28 }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <Image src={f2} alt="" width={280} height={280} />
      </motion.div>
    </div>
  );
}
