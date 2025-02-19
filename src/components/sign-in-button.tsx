'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';

export const SignInButton = () => {
  const session = useSession();
  console.log(session);
  const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
  return (
    <>
      {session && session.data?.user ? (
        <span className="z-[10]">
          <button onClick={() => SetToggleMenu(!toggleMenu)}>
            <img
              alt="tania andrew"
              src={session.data.user.image || ''}
              className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
              data-popover-target="profile-menu"
            />
          </button>
          {toggleMenu && (
            <ul
              role="menu"
              data-popover="profile-menu"
              data-popover-placement="bottom"
              className="absolute z-10 mr-12 min-w-[150px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
            >
              <li
                role="menuitem"
                className="flex w-full cursor-pointer items-center rounded-md p-3 text-sm text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <BiSolidPurchaseTagAlt />

                <p className="ml-2 font-medium text-slate-800">Purchases</p>
              </li>

              <hr className="my-2 border-slate-200" role="menuitem" />
              <li
                role="menuitem"
                className="flex w-full cursor-pointer items-center rounded-md p-3 text-sm text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-slate-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <button
                  className="ml-2 font-medium text-slate-800"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </span>
      ) : (
        <div className="hover:text-green-600 md:mr-12">
          <button onClick={() => signIn('google')}>Sign In</button>
        </div>
      )}
    </>
  );
};

const UserSessionMenu = () => {
  return (
    <>
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown header{' '}
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownInformation"
        className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="truncate font-medium">name@flowbite.com</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  );
};

// export const SignInButton = () => {
//     const session = useSession();
//     console.log(session);
//     const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
//     return (
//       <>
//         {session && session.data?.user ? (
//           <span>
//             <Avatar onClick={()=>SetToggleMenu(!toggleMenu)}>
//               <AvatarImage src={session.data.user.image as string} />
//               {/* TODO destructure the user from session and use here */}
//               <AvatarFallback>
//                 {session.data.user.name?.split(' ')[0][0]?.toUpperCase()}{' '}
//                 {session.data.user.name?.split(' ')[1][0]}
//               </AvatarFallback>
//             </Avatar>
//           </span>
//         ) : (
//           <div classNameName="hover:text-green-600 md:mr-12">
//             <button onClick={() => signIn('google')}>Sign In</button>
//           </div>
//         )}
//       </>
//     );
//   };
