import { getRecentlyAddedJobs } from '@/app/actions/actions';
import { Job } from '@prisma/client';
import { useEffect, useState } from 'react';
import JobCard from './jobs/JobCard';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RecentlyAddedJobs() {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const fetchRecentlyAddedJobs = async () => {
    try {
      setLoading(true);
      const { success, jobs, error } = await getRecentlyAddedJobs();
      if (!success) {
        console.error(error);
      }

      if (jobs) {
        setRecentJobs(jobs);
      }
    } catch (error) {
      console.error('error getting recently added jobs : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentlyAddedJobs();
  }, []);
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center py-5 text-white">
      <div className="w-full py-10 text-center">
        <p className="text-2xl font-bold text-white md:text-4xl">
          Recently added jobs
        </p>
      </div>

      {status !== 'loading' && !loading && recentJobs.length === 0 && (
        <p>no recent jobs found</p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex w-full flex-col items-center space-y-4 px-8 md:px-44">
            {recentJobs &&
              recentJobs.map((job) => <JobCard job={job} key={job.id} />)}
          </div>
          <button
            onClick={() => router.push('/jobs')}
            className="mt-10 flex items-center space-x-1 text-white hover:text-pink-600"
          >
            See all jobs <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}
