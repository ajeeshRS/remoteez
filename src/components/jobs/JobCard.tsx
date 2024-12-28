'use client';
import { Briefcase, DollarSign, IndianRupee, MapPin } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RxBookmark, RxBookmarkFilled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Image from 'next/image';

import {
  addBookmark,
  getJobseekerInfo,
  removeBookmark,
} from '@/app/actions/jobseeker/actions';
import { JOBSEEKER } from '@/lib/constants/app.constants';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Bookmark, Job } from '@prisma/client';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const [bookmarks, setBookmark] = useState<Bookmark[]>([]);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const userBookmarks = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker?.Bookmark,
  );

  const getFiltered = (id: string) => {
    return bookmarks.filter((b) => b.jobId === id);
  };

  const refetchProfile = async () => {
    const { jobSeekerProfile } = await getJobseekerInfo();
    if (jobSeekerProfile) {
      dispatch(setJobseekerProfile(jobSeekerProfile));
    }
  };

  const showToast = (response: {
    success: boolean;
    error?: string;
    message?: string;
  }) => {
    if (response.success) {
      toast.success(response.message);
      refetchProfile();
    } else {
      toast.success(response.error);
    }
  };

  const toggleBookmark = async (id: string) => {
    try {
      const filtedItem = getFiltered(id);
      // removing
      if (filtedItem.length > 0) {
        const bmId = filtedItem[0];
        const response = await removeBookmark(bmId.id);
        showToast(response);
        return;
      }

      // adding
      const response = await addBookmark(id);
      showToast(response);
    } catch (error) {
      console.error('error toggling bookmark : ', error);
      toast.error('error toggling bookmark');
    }
  };

  useEffect(() => {
    if (userBookmarks) {
      setBookmark(userBookmarks);
    }
  }, [userBookmarks]);

  useEffect(() => {
    refetchProfile();
  }, []);
  return (
    <div className="flex w-full flex-col items-start border border-neutral-800 bg-black p-3 md:p-5">
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
            <p className="text-sm font-bold text-pink-400">{job.title}</p>
            <p className="text-xs">{job.companyName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-4">
          <p className="text-xs">
            Posted on {job.postedAt.toLocaleDateString()}
          </p>
          <button
            onClick={() => toggleBookmark(job.id)}
            className={`cursor-pointer ${session?.user.role === JOBSEEKER ? 'block' : 'hidden'} `}
          >
            {getFiltered(job.id).length > 0 ? (
              <RxBookmarkFilled className="bg-pink- h-6 w-6 text-pink-600" />
            ) : (
              <RxBookmark className="text-pink bg-pink- h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      <div className="my-3 grid w-full grid-cols-1 items-center justify-between gap-3 space-x-5 text-sm md:grid-cols-2">
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
            <span>
              {job.minSalary / 1000}k-{job.maxSalary / 1000}k
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="h-4 w-4 text-pink-500" />
            <span>{`${job.minExperience}-${job.maxExperience}`} YOE</span>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 items-center md:flex md:flex-wrap">
        {job.skillsRequired.map((skill, i) => (
          <p key={i} className="my-2 mr-4 bg-pink-500/30 p-1 text-sm">
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
}
