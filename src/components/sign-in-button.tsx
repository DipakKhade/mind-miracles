'use client';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const SignInButton = () => {
  const session = useSession();
  console.log(session);
  return (
    <>
      {session && session.data?.user ? (
        <span>
          <Avatar>
            <AvatarImage src={session.data.user.image as string} />
            {/* TODO destructure the user from session and use here */}
            <AvatarFallback>
              {session.data.user.name?.split(' ')[0][0]?.toUpperCase()}{' '}
              {session.data.user.name?.split(' ')[1][0]}
            </AvatarFallback>
          </Avatar>
        </span>
      ) : (
        <div className="hover:text-green-600 md:mr-12">
          <button onClick={() => signIn('google')}>Sign In</button>
        </div>
      )}
    </>
  );
};
