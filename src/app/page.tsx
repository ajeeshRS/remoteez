import { Plus, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className=" flex h-[90vh] w-full flex-col items-center justify-center">
      <h3 className="text-5xl font-semibold text-center px-2 text-white">Find Work That Works Anywhere.</h3>
      <p className="my-3 text-sm font-medium text-neutral-50">Your Remote Job Hunt Starts Here.</p>
      <div className="my-4 flex w-full items-center justify-center">
        <button className="mx-3 flex items-center bg-pink-600 hover:bg-pink-700 px-3 py-1 text-white outline-none">
          <Search className="mr-1 h-4 w-4" />
          Browse Jobs
        </button>
        <button className=" mx-3 flex items-center bg-pink-600 hover:bg-pink-700 px-3 py-1 text-white  outline-none">
          <Plus className="mr-1 h-4 w-4" />
          Post a job
        </button>
      </div>      
    </div>
  );
}
