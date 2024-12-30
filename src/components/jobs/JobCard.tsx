'use client';
import { Briefcase, DollarSign, IndianRupee, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Job } from '@prisma/client';
import { useRouter } from 'next/navigation';
import BookmarkButton from './Bookmark';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-start border border-neutral-800 bg-black text-white p-3 md:p-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-inherit p-2">
            <Image
              src={job.companyLogo}
              alt="sample-img"
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p
              className="cursor-pointer text-sm font-bold text-pink-400 hover:underline"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              {job.title}
            </p>
            <p className="text-xs">{job.companyName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-4">
          <p className="text-xs">
            Posted on {job.postedAt.toLocaleDateString()}
          </p>
          <BookmarkButton id={job.id} />
        </div>
      </div>
      <div className="md:my-3 my-5 grid w-full grid-cols-1 items-center justify-between gap-3 space-x-5 text-sm md:grid-cols-2">
        <div className="grid grid-cols-2 items-center gap-3 space-x-5 md:grid-cols-4">
          <p className="bg-neutral-800 p-1 text-center">{job.jobType}</p>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-pink-500" />
            <span>remote</span>
          </div>
          <div className="flex items-center space-x-1">
            {job.currency == 'INR' ? (
              <IndianRupee className="h-4 w-4 text-pink-500" />
            ) : (
              <DollarSign className="h-4 w-4 text-pink-500" />
            )}
            <span className="text-nowrap">
              {job.minSalary / 1000}k-{job.maxSalary / 1000}k
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="h-4 w-4 text-pink-500" />
            <span>{`${job.minExperience}-${job.maxExperience}`} YOE</span>
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-wrap items-center md:flex md:flex-wrap">
        {job.skillsRequired.map((skill, i) => (
          <p key={i} className="my-2 mr-4 w-fit bg-pink-500/30 p-1 text-sm">
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
}
