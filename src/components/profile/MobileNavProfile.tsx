'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import {
  EXPERIENCE,
  LINKS,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from '@/lib/constants/app.constants';

interface Props {
  active: string;
  setActive: (tab: string) => void;
}
export default function MobileNavProfile({ active, setActive }: Props) {
  const router = useRouter();
  const tabArray = [PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, LINKS];

  const activeIndex = tabArray.indexOf(active);
  const isFirstTab = activeIndex === 0;
  const isLastTab = activeIndex === tabArray.length - 1;

  const handleNext = () => {
    if (isLastTab) {
      return;
    }
    setActive(tabArray[activeIndex + 1]);
  };

  const handlePrev = () => {
    if (isFirstTab) {
      return;
    }
    setActive(tabArray[activeIndex - 1]);
  };

  return (
    <div className="flex w-full items-center justify-between px-5 md:hidden">
      <div className="flex items-center p-3 text-white">
        <IoArrowBack
          className="mr-2 h-5 w-5 cursor-pointer"
          onClick={() => router.back()}
        />
        <h3 className="text-2xl">Profile</h3>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`flex items-center justify-center ${isFirstTab ? 'bg-pink-900' : 'bg-pink-500'} mx-1`}
        >
          <ChevronLeft className="h-6 w-6" onClick={handlePrev} />
        </button>
        <button
          className={`flex items-center justify-center ${isLastTab ? 'bg-pink-900' : 'bg-pink-500'} mx-1`}
        >
          <ChevronRight className="h-6 w-6" onClick={handleNext} />
        </button>
      </div>
    </div>
  );
}
