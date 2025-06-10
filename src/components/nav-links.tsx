'use client';
import { AdminMails } from '@/lib';
import { Link } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SignInButton } from './sign-in-button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Work', href: '/our-work' },
  { name: 'Courses', href: '/courses' },
  { name: 'Contact Us', href: '/contact' },
];

export function NavLinks({ session }: { session: any }) {
  const pathname = usePathname();
  return (
    <>
      <ul className="flex flex-col items-center space-y-2 font-medium md:ml-auto md:flex-row md:space-y-0">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>
              <span className="hover:text-green-600 md:mr-12">{link.name}</span>
            </Link>
          </li>
        ))}

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
    </>
  );
}
