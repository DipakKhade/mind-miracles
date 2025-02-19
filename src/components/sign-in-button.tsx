'use client';
import { signIn } from 'next-auth/react';

export const SignInButton = () => {
  return (
    <>
      <div className="hover:text-green-600 md:mr-12">
        <button onClick={() => signIn('google')}>Sign In</button>
      </div>
    </>
  );
};
