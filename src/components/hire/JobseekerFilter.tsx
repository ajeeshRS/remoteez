import { useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  commitmentFilterItems,
} from '@/lib/constants/job.constants';
import { ExperienceRangeFilterItems } from '@/lib/constants/app.constants';
import { renderYOE } from './JobseekerCard';


interface Props {
  handleCommitment: (type: string) => void;
  handleExp: (exp: string) => void;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function JobseekerFilter({ searchQuery, handleSearch,handleCommitment,handleExp }: Props) {
    const searchParams = useSearchParams();

    const commitmentTypes = searchParams.getAll('commitment');
    const experienceTypes = searchParams.getAll('exp');

  return (
  
    <form
    onSubmit={() => {}}
    className="mb-8 h-full md:w-1/5 w-full space-y-4 overflow-y-scroll  md:border md:border-pink-500/70  px-4  py-8"
  >
    <h1 className="mb-8 text-xl font-bold">Filter</h1>
    <div className="flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Search candidates..."
        value={searchQuery}
        onChange={handleSearch}
        className="flex-grow rounded-none border border-neutral-600 bg-transparent p-2 focus:border-none focus:outline-none focus:outline-pink-500/70 focus:ring-0"
      />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-b-0" value="commitment">
          <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
            Commitment
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
            {commitmentFilterItems.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={commitmentTypes.includes(type)}
                  onChange={() => handleCommitment(type)}
                  className="rounded-none"
                />
                <span>{type}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-b-0" value="experience">
          <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
            Experience Level
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
            {ExperienceRangeFilterItems.map((yoe) => (
              <div key={yoe} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={experienceTypes.includes(yoe)}
                  onChange={() => handleExp(yoe)}
                  className="rounded-none"
                />
                <span>{renderYOE(yoe)}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </form>
)
}



