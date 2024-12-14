import { Clock, Link } from 'lucide-react';
import { useEffect } from 'react';

import {
  ONE_TO_THREE,
  SIX_PLUS,
  THREE_TO_SIX,
  ZERO_TO_ONE,
} from '@/lib/constants/app.constants';
import AddExperience from './AddExperience';
import { getDurationInYM } from '@/lib/utils';
import EditExperience from './EditExperience';

export default function Experience({ experiences }: any) {
  useEffect(() => {
    console.log(experiences);
  }, [experiences]);

  return (
    <div className="min-h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5">
        <p className="font-bold text-pink-500">Experiences</p>

        <div className="my-10 flex flex-col items-start">
          <p>Current experience in years</p>
          <p className="py-2 text-neutral-300">
            {experiences?.experienceRange === 'ZERO_TO_ONE'
              ? ZERO_TO_ONE
              : experiences?.experienceRange === 'ONE_TO_THREE'
                ? ONE_TO_THREE
                : experiences?.experienceRange === 'THREE_TO_SIX'
                  ? THREE_TO_SIX
                  : experiences?.experienceRange === 'SIX_PLUS' && SIX_PLUS}
          </p>
        </div>
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {experiences?.previousCompanies?.length !== 0 ? (
            experiences?.previousCompanies?.map((exp: any, i: number) => (
              <div key={i} className="border border-pink-400/20 p-5">
                <div className="flex w-full items-center justify-between">
                  <p className="py-2 font-bold text-neutral-300">{exp.role}</p>
                  <EditExperience experience={exp} />
                </div>
                <p className="py-1 text-sm text-neutral-400">{exp.jobType}</p>
                <p className="py-1 text-sm">{exp.companyName}</p>
                <p className="hover:underlin flex items-center text-wrap py-2 text-[11px] md:text-sm">
                  <Link className="mr-1 h-3 w-3 text-gray-200" />
                  {exp.companyWebsite}
                </p>
                <p className="flex items-center py-2 text-sm">
                  <Clock className="mr-1 h-4 w-4" />
                  {exp.duration}
                </p>
                <p className="flex items-center py-2 text-sm text-pink-600">
                  {getDurationInYM(exp.duration)}
                </p>
              </div>
            ))
          ) : (
            <p className="py-3">No experience added yet.</p>
          )}
          <AddExperience />
        </div>
      </div>
    </div>
  );
}
