'use client';
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  Dot,
  IndianRupee,
  MapPin,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getJobDetails } from '@/app/actions/actions';
import { Job } from '@prisma/client';
import Loader from '@/components/ui/loader';
import { useSession } from 'next-auth/react';
import BookmarkButton from '@/components/jobs/Bookmark';

export default function Page() {
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const fetchJobInfo = async () => {
    try {
      setLoading(true);
      const { job, success, error } = await getJobDetails(id as string);
      setLoading(false);
      if (!success) {
        toast.error(error);
      }
      if (job) {
        setJobDetails(job);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching job details : ', error);
      toast.error('Some error occured');
    }
  };

  if (!id) {
    router.back();
    return;
  }

  useEffect(() => {
    fetchJobInfo();
  }, [id]);

  if (loading || status === 'loading') {
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center p-10 text-white">
        <Loader color="pink-600" />
      </div>
    );
  }
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-start overflow-y-scroll p-10 text-white">
      <div
        className="flex h-fit w-full cursor-pointer items-center justify-start space-x-2 hover:text-pink-600"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to jobs</span>
      </div>

      <div className="flex w-full flex-col items-start justify-center py-10 md:w-4/6 md:p-10">
        <div className="flex w-full items-center justify-between space-x-3">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <p className="text-lg font-bold text-pink-400">
                {jobDetails?.title}
              </p>
              <div className="flex items-center space-x-3">
                <p className="text-xs">{jobDetails?.companyName}</p>
                <Dot className="h-5 w-5" />
                <p className="text-xs">
                  Posted on {jobDetails?.postedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="bg-pink-600 px-2 py-1 hover:bg-pink-700"
              onClick={() => router.push(jobDetails?.link as string)}
            >
              Apply
            </button>
            <BookmarkButton id={jobDetails?.id as string} />
          </div>
        </div>

        <div className="my-10 grid w-full grid-cols-2 items-center gap-3 space-x-5 md:flex">
          <p className="bg-neutral-800 p-1 text-center">
            {jobDetails?.jobType}
          </p>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-pink-500" />
            <span>remote</span>
          </div>
          <div className="flex items-center space-x-1">
            {jobDetails?.currency == 'INR' ? (
              <IndianRupee className="h-4 w-4 text-pink-500" />
            ) : (
              <DollarSign className="h-4 w-4 text-pink-500" />
            )}
            <span className="text-nowrap">
              {(jobDetails?.minSalary as number) / 1000}k-
              {(jobDetails?.maxSalary as number) / 1000}k
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="h-4 w-4 text-pink-500" />
            <span>
              {`${jobDetails?.minExperience}-${jobDetails?.maxExperience}`} YOE
            </span>
          </div>
        </div>

        <div className="my-5 flex w-full flex-col items-start justify-center">
          <h3 className="text-sm font-semibold text-pink-400">
            Skills required
          </h3>
          <div className="my-2 grid grid-cols-2 gap-3 md:flex md:space-x-3">
            {jobDetails?.skillsRequired.map((skill, i) => (
              <p
                key={i}
                className="my-2 bg-pink-500/30 p-1 text-center text-sm"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="my-5 flex w-full flex-col items-start justify-center">
          <h3 className="text-sm font-semibold text-pink-400">
            Job description
          </h3>
          <p className="my-2 text-sm text-neutral-100">
            {jobDetails?.description}
          </p>
        </div>

        <div className="my-5 flex w-full flex-col items-start justify-center">
          <h3 className="text-sm font-semibold text-pink-400">
            About {jobDetails?.companyName}
          </h3>
          <div className="bg-inherit p-2">
            {jobDetails ? (
              <Image
                src={jobDetails?.companyLogo}
                alt="sample-img"
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-pink-600" />
            )}
          </div>
          <p className="my-2 text-sm text-neutral-100">
            {jobDetails?.companyDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
