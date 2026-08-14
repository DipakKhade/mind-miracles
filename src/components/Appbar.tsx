'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SignInButton } from './sign-in-button';
import { AdminMails } from '@/lib';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import logo from '../../public/mind_miracles_logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Contact Us', href: '/#contact' },
];

export default function Appbar() {
  const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: userSession, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    setSession(userSession);
    if (userSession) {
      SetToggleMenu(false);
    }
  }, [userSession, status]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-green-900/10 bg-white/85 shadow-[0_1px_20px_rgba(0,60,47,0.06)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/60 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => SetToggleMenu(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105">
              <Image
                src={logo}
                alt="Mind Miracles logo"
                width={36}
                height={36}
                className="h-8 w-8 object-cover"
                priority
              />
            </span>
            <span className="text-lg font-bold tracking-tight text-[#003C2F]">
              Mind<span className="text-green-600">Miracles</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? 'bg-green-600/10 text-green-700'
                        : 'text-[#003C2F]/70 hover:bg-green-600/5 hover:text-green-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            {status === 'authenticated' && (
              <li>
                <Link
                  href="/purchases"
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === '/purchases'
                      ? 'bg-green-600/10 text-green-700'
                      : 'text-[#003C2F]/70 hover:bg-green-600/5 hover:text-green-700'
                  }`}
                >
                  Purchases
                </Link>
              </li>
            )}
            {session && AdminMails.includes(session.user?.email!) && (
              <li>
                <Link
                  href="/admin"
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-[#003C2F]/70 transition-colors duration-200 hover:bg-green-600/5 hover:text-green-700"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="ml-3">
              <SignInButton />
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#003C2F] transition-colors hover:bg-green-600/10 lg:hidden"
            onClick={() => SetToggleMenu((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={toggleMenu}
          >
            {toggleMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {toggleMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mb-4 space-y-1 rounded-2xl border border-green-900/10 bg-white/95 p-3 shadow-xl shadow-green-900/5 backdrop-blur-xl">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => SetToggleMenu(false)}
                      className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-green-600/10 text-green-700'
                          : 'text-[#003C2F]/80 hover:bg-green-600/5 hover:text-green-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                {status === 'authenticated' && (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => SetToggleMenu(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#003C2F]/80 transition-colors hover:bg-green-600/5 hover:text-green-700"
                    >
                      {userSession?.user?.image ? (
                        <img
                          src={userSession.user.image}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-green-600/30"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-teal-700 text-xs font-bold text-white">
                          {(
                            userSession?.user?.name ??
                            userSession?.user?.email ??
                            '?'
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                      My Profile
                    </Link>
                    <Link
                      href="/purchases"
                      onClick={() => SetToggleMenu(false)}
                      className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-[#003C2F]/80 transition-colors hover:bg-green-600/5 hover:text-green-700"
                    >
                      Purchases
                    </Link>
                    {session && AdminMails.includes(session.user?.email!) && (
                      <Link
                        href="/admin"
                        onClick={() => SetToggleMenu(false)}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[#003C2F]/80 transition-colors hover:bg-green-600/5 hover:text-green-700"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    )}
                  </>
                )}
                {status === 'authenticated' ? (
                  <div className="border-t border-green-900/5 pt-3">
                    <button
                      onClick={() => {
                        SetToggleMenu(false);
                        signOut();
                      }}
                      className="w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-green-900/5 pt-3">
                    <SignInButton />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
