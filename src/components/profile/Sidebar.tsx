'use client';
import {
  EMPLOYER,
  EMPLOYER_INFO,
  employerSidebarItems,
  EXPERIENCE,
  JOBS,
  JOBSEEKER,
  jobseekerSidebarItems,
  LINKS,
  PERSONAL_INFO,
  PROJECTS,
  SECURITY,
  SKILLS,
} from '@/lib/constants/app.constants';
import {
  FolderGit,
  Link,
  List,
  ListCheck,
  Lock,
  StepBack,
  User,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

interface Props {
  active: string;
  setActive: (tab: string) => void;
}

export default function Sidebar({ active, setActive }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="hidden min-h-[90vh] w-1/5 flex-col border border-pink-400/20 bg-pink-900/20 text-white md:flex">
      <div className="flex items-center p-3">
        <IoArrowBack
          className="mx-2 h-5 w-5 cursor-pointer"
          onClick={() => router.back()}
        />
        <h3 className="px-3 text-2xl">Profile</h3>
      </div>
      {session?.user.role === JOBSEEKER && (
        <ul className={`items flex w-full flex-col px-5 py-10 text-white`}>
          {jobseekerSidebarItems.map((item, i) => (
            <li
              key={i}
              className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == item.active && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
              onClick={() => setActive(item.active)}
            >
              {renderIcons(item.active)}
              {item.title}
            </li>
          ))}
        </ul>
      )}
      {session?.user.role === EMPLOYER && (
        <ul className={`items flex w-full flex-col px-5 py-10 text-white`}>
          {employerSidebarItems.map((item, i) => (
            <li
              key={i}
              className={`flex cursor-pointer items-center px-2 py-3 hover:bg-pink-300/10 ${active == item.active && 'border-r-2 border-r-pink-700 bg-pink-300/10'}`}
              onClick={() => setActive(item.active)}
            >
              {renderIcons(item.active)}
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const renderIcons = (value: string) => {
  switch (value) {
    case PERSONAL_INFO:
      return <User className="mr-2 h-4 w-4" />;
    case EMPLOYER_INFO:
      return <User className="mr-2 h-4 w-4" />;
    case SKILLS:
      return <ListCheck className="mr-2 h-4 w-4" />;
    case PROJECTS:
      return <FolderGit className="mr-2 h-4 w-4" />;
    case EXPERIENCE:
      return <StepBack className="mr-2 h-4 w-4" />;
    case LINKS:
      return <Link className="mr-2 h-4 w-4" />;
    case SECURITY:
      return <Lock className="mr-2 h-4 w-4" />;
    case JOBS:
      return <List className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};
