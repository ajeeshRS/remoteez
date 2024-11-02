import { BackgroundBeams } from "@/components/ui/background-beams";
import { Plus, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="h-[90vh] w-full bg-white dark:bg-neutral-900 flex flex-col items-center justify-center">
      <h3 className="text-3xl font-semibold">Find Work That Works Anywhere.</h3>
      <p className="text-sm my-3">Your Remote Job Hunt Starts Here.</p>
      <div className="w-full flex items-center justify-center my-4">
        <button className="relative z-10 flex items-center py-1 px-3 hover:bg-[#008080] bg-[#00B2B2] text-white mx-3">
          <Search className="w-4 h-4 mr-1" />
          Browse Jobs
        </button>
        <button className="relative z-10 flex items-center py-1 px-3 hover:bg-[#008080] bg-[#00B2B2] text-white mx-3">
          <Plus className="w-4 h-4 mr-1" />
          Post a job
        </button>
      </div>
      <BackgroundBeams />
    </div>
  );
}
