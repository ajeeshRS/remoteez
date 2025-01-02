'use client';
import { mulish } from '@/app/fonts/fonts';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/lib/auth';
import { EMPLOYER, JOBSEEKER } from '@/lib/constants/app.constants';
import Avatar from '../Avatar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;

  if (status === 'loading') {
    return <NavbarSkeleton />;
  }

  return (
    <nav className="z-100 relative flex w-full items-center justify-between bg-transparent px-6 py-5 text-black backdrop-blur-lg md:px-10 md:py-4">
      <div className="flex items-center justify-center">
        <MobileNavbar />
        <h2
          onClick={() => router.push('/')}
          className={`ml-3 flex items-start text-2xl font-bold md:ml-0 ${mulish.className} cursor-pointer text-neutral-50`}
        >
          Remoteez
        </h2>
      </div>

      <ul className="hidden w-fit items-center justify-between md:flex md:w-fit">
        {customSession?.user.role === EMPLOYER ? (
          <>
            <li
              onClick={() => router.push('/create')}
              className="mr-10 cursor-pointer text-white hover:text-pink-500"
            >
              Post a job
            </li>
          </>
        ) : customSession?.user.role === JOBSEEKER ? (
          <>
            <li
              onClick={() => router.push('/jobs')}
              className="mr-10 flex cursor-pointer items-center text-white hover:text-pink-500"
            >
              Explore Jobs
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => router.push('/signup?type=jobseeker')}
              className="mx-10 flex cursor-pointer items-center text-white hover:text-pink-500"
            >
              For Jobs
            </li>
            <li
              onClick={() => router.push('/signup?type=employer')}
              className="mr-10 flex cursor-pointer items-center text-white hover:text-pink-500"
            >
              For Hire
            </li>
          </>
        )}

        <li className="ml-5 md:mx-0">
          {customSession?.user ? (
            <Avatar />
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="bg-pink-600 px-3 py-1 text-white hover:bg-pink-700"
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

const NavbarSkeleton = () => {
  return (
    <nav className="z-100 relative flex w-full items-center justify-between bg-transparent px-6 py-5 backdrop-blur-lg md:px-10 md:py-4">
      <div className="flex items-center justify-center">
        <MobileNavbar />
        <h2
          className={`ml-3 flex items-start text-2xl font-bold md:ml-0 cursor-pointer text-neutral-50`}
        >
          Remoteez
        </h2>
      </div>

      <ul className="hidden w-fit items-center justify-between md:flex md:w-fit">
        <li className="mr-10">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-800" />
        </li>
        <li className="mr-10">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-800" />
        </li>

        <li className="ml-5 md:mx-0">
          <div className="h-8 w-20 animate-pulse rounded bg-gray-800" />
        </li>
      </ul>
    </nav>
  );
};
