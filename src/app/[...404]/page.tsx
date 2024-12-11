'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <div className='md:w-1/2 w-5/6 h-1/2 flex flex-col items-center justify-center'>
        <h3 className="text-6xl font-bold text-white">404</h3>
        <p className="text-base text-neutral-400 py-4">Page not found</p>
        <button
          onClick={() => router.push('/')}
          className="my-4 flex w-3/6 items-center justify-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700 md:w-2/6"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
