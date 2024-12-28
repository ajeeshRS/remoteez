import { useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  commitmentFilterItems,
  experienceFilterItems,
  payFilterItems,
} from '@/lib/constants/job.constants';
import { DollarSign } from 'lucide-react';

interface Props {
  handleCommitment: (type: string) => void;
  handleExp: (exp: string) => void;
  handlePay: (pay: string) => void;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function JobFilter({
  handleCommitment,
  handleExp,
  handlePay,
  searchQuery,
  handleSearch,
}: Props) {
  const searchParams = useSearchParams();

  const commitmentTypes = searchParams.getAll('commitment');
  const experienceTypes = searchParams.getAll('exp');
  const payTypes = searchParams.getAll('pay');

  return (
    <form
      onSubmit={() => {}}
      className="mb-8 h-full w-1/5 space-y-4 overflow-y-scroll border border-pink-500/70 px-4 py-8"
    >
      <h1 className="mb-8 text-xl font-bold">Filter</h1>
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Search jobs..."
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
              {experienceFilterItems.map((yoe) => (
                <div key={yoe} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={experienceTypes.includes(yoe)}
                    onChange={() => handleExp(yoe)}
                    className="rounded-none"
                  />
                  <span>{yoe}</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b-0" value="pay">
            <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
              Pay
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
              {payFilterItems.map((pay) => (
                <div key={pay} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={payTypes.includes(pay)}
                    onChange={() => handlePay(pay)}
                    className="rounded-none"
                  />
                  <span className='flex items-center space-x-1'><DollarSign className='w-3 h-3'/> {pay}k</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </form>
  );
}
