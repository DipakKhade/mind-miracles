import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { SignInButton } from './sign-in-button';
import { AdminMails } from '@/lib';
import { authOptions } from '@/lib/auth_options';

export default async function Appbar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav>
        <div className="relative flex max-w-screen-xl flex-col px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <Link href={'/'}>
            <span className="text-xl text-black">Mindmiracles</span>
          </Link>

          <input type="checkbox" className="peer hidden" id="navbar-open" />
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
              <li className="hover:text-green-600 md:mr-12">
                <Link href={'/'}>Home</Link>
              </li>
              <li className="hover:text-green-600 md:mr-12">
                <Link href={'/#about'}>About</Link>
              </li>
              <li className="hover:text-green-600 md:mr-12">
                <Link href={'/#our-work'}>Our Work</Link>
              </li>
              <li className="hover:text-green-600 md:mr-12">
                <Link href={'/courses'}>Courses</Link>
              </li>

              <li className="hover:text-green-600 md:mr-12">
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
