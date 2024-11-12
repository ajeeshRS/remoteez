import { BackgroundBeams } from '@/components/ui/background-beams';
import { Plus, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center bg-white dark:bg-neutral-900">
      <h3 className="text-3xl font-semibold text-center px-2">Find Work That Works Anywhere.</h3>
      <p className="my-3 text-sm">Your Remote Job Hunt Starts Here.</p>
      <div className="my-4 flex w-full items-center justify-center">
        <button className="relative z-10 mx-3 flex items-center bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080] outline-none">
          <Search className="mr-1 h-4 w-4" />
          Browse Jobs
        </button>
        <button className="relative z-10 mx-3 flex items-center bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080] outline-none">
          <Plus className="mr-1 h-4 w-4" />
          Post a job
        </button>
      </div>
      <BackgroundBeams />
    </div>
  );
}
