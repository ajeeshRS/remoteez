import { Clock, Link } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import {
  ONE_TO_THREE,
  SIX_PLUS,
  THREE_TO_SIX,
  ZERO_TO_ONE,
} from '@/lib/constants/app.constants';
import { ExperienceRange } from '@prisma/client';
import AddExperience from './AddExperience';
import { getDurationInYM } from '@/lib/utils';
import EditExperience from './EditExperience';
import { RootState } from '@/state/store';
import { PreviousCompany } from '@/types/common';
import DeleteExperienceDialog from './DeleteExperienceDialog';
import EditExperienceRange from './EditExperienceRange';
import SaveResumeLink from './SaveResumeLink';

export default function Experience() {
  const router = useRouter();

  const experience = useSelector(
    (state: RootState) =>
      state.jobseekerReducer.jobseeker?.experienceRange as ExperienceRange,
  );

  const previousCompanies = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker?.previousCompanies,
  );

  const resumeLink = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker?.resume,
  );

  const renderExperience = () => {
    switch (experience) {
      case 'ZERO_TO_ONE':
        return ZERO_TO_ONE;

      case 'ONE_TO_THREE':
        return ONE_TO_THREE;

      case 'THREE_TO_SIX':
        return THREE_TO_SIX;

      case 'SIX_PLUS':
        return SIX_PLUS;

      default:
        return null;
    }
  };

  return (
    <div className="md:h-[90vh] h-[100svh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="font-bold text-pink-500">Experiences</p>

        <div className="my-10 flex flex-col items-start">
          <p>Current experience in years</p>
          <div className="flex items-center">
            <p className="py-2 text-neutral-300">{renderExperience()}</p>
            <EditExperienceRange currentExp={experience} />
          </div>
        </div>
        <div className="my-10 flex w-full flex-col items-start">
          <p>Resume link</p>
          <div className="flex w-full items-center">
            <p
              className="mr-2 h-fit w-5/6 cursor-pointer overflow-scroll text-nowrap px-1 py-2 text-neutral-300 hover:underline"
              onClick={() => router.push(resumeLink as string)}
            >
              {resumeLink !== null ? resumeLink : 'not added yet'}
            </p>
            <SaveResumeLink resumeLink={resumeLink as string} />
          </div>
        </div>
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {previousCompanies?.length !== 0 ? (
            previousCompanies?.map((exp: PreviousCompany, i: number) => (
              <div key={i} className="border border-pink-400/20 p-5">
                <div className="flex w-full items-center justify-between">
                  <p className="py-2 font-bold text-neutral-300">{exp.role}</p>
                  <div className='flex items-center'>
                    <EditExperience experience={exp} expId={exp.id as string} />
                    <DeleteExperienceDialog expId={exp.id as string} />
                  </div>
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
                  {getDurationInYM(exp.duration as string)}
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
