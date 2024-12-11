'use client';
import {
  EXPERIENCE,
  LINKS,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from '@/lib/constants/app.constants';
import { FolderGit, Link, ListCheck, StepBack, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

interface Props {
  active: string;
  setActive: (tab: string) => void;
}

export default function Sidebar({ active, setActive }: Props) {
  const router = useRouter();
  return (
    <div className="md:flex hidden min-h-[90vh] w-1/5 flex-col border border-pink-400/20 bg-pink-900/20 text-white">
      <div className="flex items-center p-3">
        <IoArrowBack
          className="mx-2 h-5 w-5 cursor-pointer"
          onClick={() => router.back()}
        />
        <h3 className="px-3 text-2xl">Profile</h3>
      </div>
      <ul className="items flex w-full flex-col px-5 py-10 text-white">
        <li
          className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == PERSONAL_INFO && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
          onClick={() => setActive(PERSONAL_INFO)}
        >
          <User className="mr-2 h-4 w-4" />
          personal info
        </li>
        <li
          className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == SKILLS && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
          onClick={() => setActive(SKILLS)}
        >
          <ListCheck className="mr-2 h-4 w-4" />
          skills
        </li>
        <li
          className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == PROJECTS && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
          onClick={() => setActive(PROJECTS)}
        >
          <FolderGit className="mr-2 h-4 w-4" />
          projects
        </li>
        <li
          className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == EXPERIENCE && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
          onClick={() => setActive(EXPERIENCE)}
        >
          <StepBack className="mr-2 h-4 w-4" />
          Experience
        </li>
        <li
          className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == LINKS && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
          onClick={() => setActive(LINKS)}
        >
          <Link className="mr-2 h-4 w-4" />
          Links
        </li>
      </ul>
    </div>
  );
}
