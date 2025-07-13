'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { PiSignOutBold } from 'react-icons/pi';

export const SignInButton = () => {
  const [imageURl, setImageURl] = useState<string>('');
  const session = useSession();
  const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setImageURl(session.data?.user?.image ?? '');
  }, [session.data?.user?.image]);

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

  const handleMenuToggle = () => {
    SetToggleMenu(!toggleMenu);
  };

  const handleMenuItemClick = () => {
    SetToggleMenu(false);
  };

  return (
    <>
      {session && session.data?.user ? (
        // <span className="relative z-[10]" ref={menuRef}>
        //   <button
        //     onClick={handleMenuToggle}
        //     aria-expanded={toggleMenu}
        //     aria-haspopup="true"
        //   >
        //     <img
        //       alt="User profile"
        //       src={
        //         imageURl
        //           ? imageURl
        //           : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxH2CteA3O6uK6JmgQfdzDg4IHMtZyzpbx2w&s'
        //       }
        //       className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
        //       data-popover-target="profile-menu"
        //     />
        //   </button>

        //   {toggleMenu && (
        //     <ul
        //       role="menu"
        //       data-popover="profile-menu"
        //       data-popover-placement="bottom"
        //       className="absolute right-0 top-full z-20 mt-2 min-w-[150px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none"
        //     >
        //       <li
        //         role="menuitem"
        //         className="flex w-full cursor-pointer items-center rounded-md p-3 text-sm text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        //       >
        //         <BiSolidPurchaseTagAlt />
        //         <Link href="/purchases" onClick={handleMenuItemClick}>
        //           <p className="ml-2 font-medium text-slate-800">Purchases</p>
        //         </Link>
        //       </li>
        //       <hr className="my-2 border-slate-200" role="menuitem" />
        //       <li
        //         role="menuitem"
        //         className="flex w-full cursor-pointer items-center rounded-md p-3 text-sm text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        //       >
        //         <PiSignOutBold />
        //         <button
        //           className="ml-2 font-medium text-slate-800"
        //           onClick={() => {
        //             signOut();
        //             handleMenuItemClick();
        //           }}
        //         >
        //           Sign Out
        //         </button>
        //       </li>
        //     </ul>
        //   )}
        // </span>
        <div className="hover:text-green-600 md:mr-12">
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div className="hover:text-green-600 md:mr-12">
          <button onClick={() => signIn('google')}>Sign In</button>
        </div>
      )}
    </>
  );
};
