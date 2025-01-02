'use client'
import { Briefcase, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { JobSeeker } from '@prisma/client';
import {
  ONE_TO_THREE,
  SIX_PLUS,
  THREE_TO_SIX,
  ZERO_TO_ONE,
} from '@/lib/constants/app.constants';

interface Props {
  jobseeker: JobSeeker;
}
export default function JobseekerCard({ jobseeker }: Props) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-start border border-neutral-800 bg-black p-3 text-white md:p-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-inherit p-2">
            {jobseeker.avatar ? (
              <Image
                src={jobseeker.avatar}
                alt="sample-img"
                width={40}
                height={40}
                className="h-10 w-10 border border-neutral-500 object-cover"
              />
            ) : (
              <p className="bg-neutral-400 px-3 py-1 text-black">
                {jobseeker.fullName.charAt(0).toUpperCase()}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <p
              className="cursor-pointer text-sm font-bold text-pink-400 hover:underline"
              onClick={() => router.push(`/hire/${jobseeker.id}`)}
            >
              {jobseeker.fullName}
            </p>
            <p className="text-xs">{jobseeker.desiredJobTitle}</p>
          </div>
        </div>
      </div>
      <div className="my-5 grid w-full grid-cols-2 items-center justify-between gap-3 space-x-5 text-sm md:my-3 md:grid-cols-5">
        <p className="bg-neutral-800 p-1 text-center">
          {jobseeker.preferredJobType ? jobseeker.preferredJobType : 'FUll_TIME'} 
        </p>
        <div className="flex items-center justify-center space-x-2">
          <MapPin className="h-4 w-4 text-pink-500" />
          <span>{jobseeker.location}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Briefcase className="h-4 w-4 text-pink-500" />
          <span>{renderYOE(jobseeker.experienceRange)}</span>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center md:flex md:flex-wrap">
        {jobseeker.skills.map((skill, i) => (
          <p key={i} className="my-2 mr-4 w-fit bg-pink-500/30 p-1 text-sm">
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
}

export const renderYOE = (yoe: string) => {
  switch (yoe) {
    case 'ZERO_TO_ONE':
      return ZERO_TO_ONE;
    case 'ONE_TO_THREE':
      return ONE_TO_THREE;
    case 'THREE_TO_SIX':
      return THREE_TO_SIX;
    case 'SIX_PLUS':
      return SIX_PLUS;

    default:
      return '';
  }
};
