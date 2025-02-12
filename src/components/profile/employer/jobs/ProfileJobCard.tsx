import { Job } from '@prisma/client';
import { Bookmark } from 'lucide-react';
import EditJob from './EditJob';
import DeleteJobDialog from './DeleteJobDialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  getAppliedCount,
  getBookmarkCount,
} from '@/app/actions/employer/actions';

interface Props {
  job: Job;
}
export default function ProfileJobCard({ job }: Props) {
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);

  const fetchBookmarkCount = async () => {
    try {
      const { count, success, error } = await getBookmarkCount(job.id);

      if (!success) {
        console.error('error getting bookmark count : ', error);
      }

      if (count) {
        setBookmarkCount(count);
      }
    } catch (error) {
      console.error('Error fetching bookmark count : ', error);
      toast.error('Some error occured');
    }
  };

  const fetchAppliedCount = async () => {
    try {
      const { count, success, error } = await getAppliedCount(job.id);
      if (!success) {
        console.error('error getting applied count : ', error);
      }

      if (count) {
        setAppliedCount(count);
      }
    } catch (error) {
      console.error('error getting applied count : ', error);
    }
  };

  useEffect(() => {
    fetchBookmarkCount();
    fetchAppliedCount();
  }, []);

  return (
    <div className="flex flex-col border border-pink-400/20 p-4">
      <div className="flex flex-col items-start justify-between py-5 md:flex-row md:items-center">
        <div className="flex flex-col items-start">
          <p className="font-bold">{job.title}</p>
          <p className="my-1 text-xs md:my-1">
            {job.postedAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <EditJob job={job} />
          <DeleteJobDialog jobId={job.id} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="my-2 flex w-full items-center justify-between">
            <p>{`${job.currency === 'USD' ? '$' : job.currency === 'INR' && '₹'}${job.minSalary / 1000}k-${job.maxSalary / 1000}k`}</p>
            <p className="bg-pink-600/20 px-2 py-1">
              {job.jobType.split('_').join(' ').toLowerCase()}
            </p>
          </div>
        </div>
        <div className="my-2 flex items-center justify-between">
          <p>EXP: {`${job.minExperience}-${job.maxExperience} years`}</p>
          <p className="my-1 text-xs md:my-0"> {appliedCount} applied</p>
          <div className="flex items-center">
            <Bookmark className="mr-1 h-4 w-4 text-pink-600" />
            <p className="text-xs">{bookmarkCount}</p>
          </div>
        </div>
        <div className="my-2 grid grid-cols-2 gap-3">
          {job.skillsRequired.map((skill: string, i: number) => (
            <p key={i} className="bg-pink-500/20 px-2 py-1 text-sm text-white">
              {skill}
            </p>
          ))}
        </div>
        <div className="my-2 flex flex-col items-start justify-start">
          <p className="py-2 text-neutral-400">Description</p>
          <p className="text-sm">{job.description}</p>
        </div>
        <p className="text-sm">
          <span className="font-bold">link</span> :{job.link}
        </p>
      </div>
    </div>
  );
}
