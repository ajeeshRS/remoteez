import { jobs } from '@/lib/constants/app.constants';
import { Bookmark } from 'lucide-react';

export default function Jobs() {
  return (
    <div className="h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="pb-10 font-bold text-pink-500">Jobs</p>
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="flex flex-col border border-pink-400/20 p-4"
            >
              <div className="flex md:flex-row flex-col md:items-center items-start justify-between">
                <p className="font-bold">{job.title}</p>
                  <p className="text-xs md:my-0 my-1">246 applied</p>
                  <p className="text-xs md:my-0 my-1">{job.postedAt.toLocaleDateString()}</p>

              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="my-2 flex w-full items-center justify-between md:w-1/2">
                    <p>{`${job.currency === 'USD' ? '$' : job.currency === 'INR' && '₹'}${job.minSalary / 1000}k-${job.maxSalary / 1000}k`}</p>
                    <p className="bg-pink-600/20 px-2 py-1">
                      {job.jobType.split('_').join(' ').toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="my-2 flex items-center justify-between">
                  <p>
                    EXP: {`${job.minExperience}-${job.maxExperience} years`}
                  </p>
                  <div className="flex items-center">
                    <Bookmark className="mr-1 h-4 w-4 text-pink-600" />
                    <p>156</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 my-2">
                  {job.skillsRequired.map((skill, i) => (
                    <p
                      key={i}
                      className="bg-pink-500/20 px-2 py-1 text-sm text-white"
                    >
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
          ))}
        </div>
      </div>
    </div>
  );
}
