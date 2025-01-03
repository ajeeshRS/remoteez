import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import ProfileJobCard from './ProfileJobCard';

export default function Jobs() {
  const jobs = useSelector(
    (state: RootState) => state.employerReducer.employer?.jobs,
  );

  return (
    <div className="md:h-[90vh] h-[90dvh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="font-bold text-pink-500">Jobs</p>
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs && jobs.length !== 0 ? (
            jobs.map((job, i) => <ProfileJobCard key={i} job={job} />)
          ) : (
            <p>no jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
