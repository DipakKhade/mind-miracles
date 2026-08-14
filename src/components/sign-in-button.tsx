'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';

export const SignInButton = () => {
  const session = useSession();
  const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        SetToggleMenu(false);
      }
    };

    if (toggleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        SetToggleMenu(false);
      }
    };

    if (toggleMenu) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [toggleMenu]);

  const user = session.data?.user;
  const userInitial = (user?.name ?? user?.email ?? '?')
    .charAt(0)
    .toUpperCase();

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => SetToggleMenu((prev) => !prev)}
          aria-expanded={toggleMenu}
          aria-haspopup="true"
          aria-label="Profile menu"
          className="flex items-center gap-2 rounded-full p-1 pr-2.5 transition-all duration-200 hover:bg-green-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
        >
          {user.image ? (
            <img
              alt={`${user.name ?? 'User'} avatar`}
              src={user.image}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-green-600/30"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-teal-700 text-sm font-bold text-white shadow-md shadow-green-600/25">
              {userInitial}
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-[#003C2F]/60 transition-transform duration-200 ${
              toggleMenu ? 'rotate-180' : ''
            }`}
          />
        </button>

        {toggleMenu && (
          <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-green-900/10 bg-white shadow-xl shadow-green-900/10">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="truncate text-sm font-bold text-[#003C2F]">
                {user.name}
              </p>
              <p className="truncate text-xs text-[#003C2F]/60">{user.email}</p>
            </div>
            <Link
              href="/profile"
              onClick={() => SetToggleMenu(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#003C2F]/80 transition-colors hover:bg-green-50 hover:text-green-700"
            >
              <User className="h-4 w-4" />
              My Profile
            </Link>
            <button
              onClick={() => {
                SetToggleMenu(false);
                signOut();
              }}
              className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-green-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30"
    >
      Sign In
    </button>
  );
};
