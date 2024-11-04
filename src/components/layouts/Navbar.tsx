'use client';
import { mulish } from '@/app/fonts/fonts';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="relative z-10 flex w-full items-center justify-between bg-white px-10 py-4 text-black dark:bg-neutral-900">
      <div className="Logo">
        <h2
          onClick={() => router.push('/')}
          className={`flex items-start text-2xl font-bold ${mulish.className} cursor-pointer dark:text-neutral-50`}
        >
          Remoteez
        </h2>
      </div>
      <ul className="nav-item-container flex w-2/5 items-center justify-between">
        <li className="hidden cursor-pointer text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50 md:block">
          For job seekers
        </li>
        <li className="hidden cursor-pointer text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50 md:block">
          For employers
        </li>
        <li>
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
        <li>
          <button
            onClick={() => router.push('/login')}
            className="bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080]"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}
