import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export default function Jobs() {
  const jobs = useSelector(
    (state: RootState) => state.employerReducer.employer?.jobs,
  );

  return (
    <div className="h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="pb-10 font-bold text-pink-500">Jobs</p>
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs && jobs.length !== 0 ? (
            jobs.map((job, i) => <JobCard key={i} job={job} />)
          ) : (
            <p>no jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
