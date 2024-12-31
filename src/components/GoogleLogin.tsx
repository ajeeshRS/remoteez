'use client';

import { FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function GoogleLogin() {
  return (
    <div className="w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          signIn('google', {
            callbackUrl: '/',
          });
        }}
        className="flex w-full items-center justify-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700"
      >
        <FaGoogle className="mr-2 h-4 w-4 text-white" /> Login with Google
      </button>
    </div>
  );
}
