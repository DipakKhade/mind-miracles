'use client';
import Link from 'next/link';
import { SignInButton } from './sign-in-button';
import { AdminMails } from '@/lib';
import { useEffect, useRef, useState } from 'react';
import { getSession } from 'next-auth/react';

export default function Appbar() {
  // const session = await getServerSession(authOptions);
  const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);
  const btnRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setSession(await getSession());
      if (session) {
        SetToggleMenu(false);
      }
    })();
  }, [session]);

  const handleClickOutside = (event: MouseEvent) => {
    if (btnRef.current && !btnRef.current.contains(event.target as Node)) {
      btnRef.current.click();
      SetToggleMenu(false);
    }
  };

  useEffect(() => {
    if (toggleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu]);

  const handleMenuToggle = () => {
    btnRef.current?.click();
    SetToggleMenu(!toggleMenu);
  };

  return (
    <>
      <nav>
        <div className="relative flex max-w-screen-xl flex-col px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <Link href={'/'}>
            <span onClick={handleMenuToggle} className="text-xl text-black">
              Mindmiracles
            </span>
          </Link>

          <input
            type="checkbox"
            className="peer hidden"
            id="navbar-open"
            ref={btnRef}
          />
          <label
            className="absolute right-7 top-5 cursor-pointer md:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 font-medium md:ml-auto md:flex-row md:space-y-0">
              <li
                className="hover:text-green-600 md:mr-12"
                onClick={handleMenuToggle}
              >
                <Link href={'/'}>Home</Link>
              </li>
              <li
                className="hover:text-green-600 md:mr-12"
                onClick={handleMenuToggle}
              >
                <Link href={'/#about'}>About</Link>
              </li>

              <li
                className="hover:text-green-600 md:mr-12"
                onClick={handleMenuToggle}
              >
                <Link href={'/courses'}>Courses</Link>
              </li>

              <li
                className="hover:text-green-600 md:mr-12"
                onClick={handleMenuToggle}
              >
                <Link href={'/purchases'}>Purchases</Link>
              </li>

              <li
                className="hover:text-green-600 md:mr-12"
                onClick={handleMenuToggle}
              >
                <Link href={'/#contact'}>Contact Us</Link>
              </li>

              {session && AdminMails.includes(session.user?.email!) ? (
                <li className="hover:text-green-600 md:mr-12">
                  <a href="/admin">DashBoard</a>
                </li>
              ) : (
                ''
              )}
              <li>
                <SignInButton />
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}
