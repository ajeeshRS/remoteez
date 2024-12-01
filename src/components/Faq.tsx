import { faqs } from '@/lib/constants/app.constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export default function Faq() {
  return (
    <div
      id="faqs"
      className="flex min-h-[90vh] w-full flex-col items-center justify-center py-5"
    >
      <div className="w-full py-10 text-center">
        <p className="text-4xl font-bold text-white">FaQ</p>
        <p className="py-4 text-xs font-medium text-white">
          Your questions answered here.
        </p>
      </div>
      <div className="flex w-full items-center justify-center py-10">
        <Accordion type="single" collapsible className="w-5/6 md:w-4/6">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`${i}`}>
              <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-normal text-neutral-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
