'use client';
import { mulish } from '@/app/fonts/fonts';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/lib/auth';
import { EMPLOYER, JOBSEEKER } from '@/lib/constants/app.constants';
import Avatar from '../Avatar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="relative z-10 flex w-full items-center justify-between bg-white px-6 py-5 text-black dark:bg-neutral-900 md:px-10 md:py-4">
      <div className="flex items-center justify-center">
        <MobileNavbar />
        <h2
          onClick={() => router.push('/')}
          className={`ml-3 flex items-start text-2xl font-bold md:ml-0 ${mulish.className} cursor-pointer dark:text-neutral-50`}
        >
          Remoteez
        </h2>
      </div>
      <ul className="hidden w-fit items-center justify-between md:flex md:w-fit">
        {status !== 'loading' && customSession?.user.role === EMPLOYER ? (
          <>
            <li className="cursor-pointer hover:text-pink-500 dark:text-white">
              Post a job
            </li>
          </>
        ) : customSession?.user.role === JOBSEEKER ? (
          <>
            <li className="flex cursor-pointer items-center hover:text-pink-500 dark:text-white">
              Explore Jobs
            </li>
          </>
        ) : (
          <>
            <li className="mx-4 flex cursor-pointer items-center hover:text-pink-500 dark:text-white">
              For Jobs
            </li>
            <li className="mx-4 flex cursor-pointer items-center hover:text-pink-500 dark:text-white">
              For Hire
            </li>
          </>
        )}

        <li className="mx-8">
          {resolvedTheme && (
            <button onClick={toggleTheme} className="flex items-center">
              {resolvedTheme === 'light' ? (
                <Moon className="h-5 w-5 text-neutral-800 dark:text-neutral-50" />
              ) : (
                <Sun className="h-5 w-5 text-neutral-800 dark:text-neutral-50" />
              )}
            </button>
          )}
        </li>

        <li className="ml-5 md:mx-0">
          {status !== 'loading' && customSession?.user ? (
            <Avatar />
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080]"
            >
              Login
            </button>
          )}
        </li>
      </ul>
      <div className="flex w-fit items-center justify-end md:hidden md:w-fit">
        {resolvedTheme && (
          <button onClick={toggleTheme} className="flex items-center">
            {resolvedTheme === 'light' ? (
              <Moon className="h-5 w-5 text-neutral-800 dark:text-neutral-50" />
            ) : (
              <Sun className="h-5 w-5 text-neutral-800 dark:text-neutral-50" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
