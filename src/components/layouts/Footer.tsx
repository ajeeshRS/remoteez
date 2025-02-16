'use client';
import { Copyright } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/profile') {
    return null;
  }
  return (
    <footer className="flex flex-col items-center justify-between bg-transparent px-10 py-5 md:flex-row md:px-20">
      <div>
        <p className="my-2 flex items-center text-sm font-medium text-white md:my-0">
          <Copyright className="mx-2 h-4 w-4" /> 2025 Remoteez.
        </p>
      </div>
      <ul className="my-2 flex items-center text-white md:my-0">
        <li className="mx-3 cursor-pointer text-sm font-medium hover:text-pink-500">
          About
        </li>
        <li className="mx-3 cursor-pointer text-sm font-medium hover:text-pink-500">
          Blog
        </li>
        <li className="mx-3 cursor-pointer text-sm font-medium hover:text-pink-500">
          Contact
        </li>
        <li className="mx-3 cursor-pointer text-sm font-medium hover:text-pink-500">
          Twitter
        </li>
      </ul>
    </footer>
  );
}
