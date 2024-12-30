'use client';
import Faq from '@/components/Faq';
import RecentlyAddedJobs from '@/components/RecentlyAddedJobs';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex h-[85vh] w-full flex-col items-center justify-center md:h-[90vh]">
        <h3 className="px-2 text-center text-3xl font-semibold text-white md:text-5xl">
          Find Work That Works Anywhere.
        </h3>
        <p className="my-3 text-sm font-medium text-neutral-50 md:text-sm">
          Your Remote Job Hunt Starts Here.
        </p>
        <div className="my-4 flex w-full items-center justify-center">
          <button
            onClick={() => router.push('/jobs')}
            className="mx-3 flex items-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700"
          >
            <Search className="mr-1 h-4 w-4" />
            Browse Jobs
          </button>
          <button
            onClick={() => router.push('/create')}
            className="mx-3 flex items-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700"
          >
            <Plus className="mr-1 h-4 w-4" />
            Post a job
          </button>
        </div>
      </div>
      <RecentlyAddedJobs />
      <Faq />
    </>
  );
}
