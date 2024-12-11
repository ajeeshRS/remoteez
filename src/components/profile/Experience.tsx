import { Link, Pen } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect } from 'react';
import {
  ONE_TO_THREE,
  SIX_PLUS,
  THREE_TO_SIX,
  ZERO_TO_ONE,
} from '@/lib/constants/app.constants';

export default function Experience({ experiences }: any) {
  enum JobType {
    PART_TIME = 'PART_TIME',
    FULL_TIME = 'FULL_TIME',
    FREELANCE = 'FREELANCE',
    INTERNSHIP = 'INTERNSHIP',
  }

  // const previousExperiences = [
  //   {
  //     companyName: 'Techverse Solutions',
  //     companyWebsite: 'https://techversesolutions.com',
  //     role: 'Full Stack Developer',
  //     duration: 'Jan 2023 - Dec 2023 (1 year)',
  //     jobType: JobType.FULL_TIME,
  //   },
  //   {
  //     companyName: 'CodeCraft Innovations',
  //     companyWebsite: 'https://codecraftinnovations.com',
  //     role: 'Frontend Developer',
  //     duration: 'Jun 2022 - Dec 2022 (6 months)',
  //     jobType: JobType.PART_TIME,
  //   },
  //   {
  //     companyName: 'Freelance Projects',
  //     companyWebsite: 'https://myportfolio.com',
  //     role: 'Full Stack Developer',
  //     duration: 'Feb 2021 - May 2022 (1 year 3 months)',
  //     jobType: JobType.FREELANCE,
  //   },
  //   {
  //     companyName: 'To-Let Globe',
  //     companyWebsite: 'https://toletglobe.com',
  //     role: 'Backend Intern',
  //     duration: 'Aug 2024 - Oct 2024 (2 months)',
  //     jobType: JobType.INTERNSHIP,
  //   },
  // ];

  useEffect(() => {
    console.log(experiences);
  }, [experiences]);

  return (
    <div className="min-h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between p-10">
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

        <div className="my-10 grid grid-cols-2 gap-6">
          {experiences?.previousCompanies?.length !== 0 ? (
            experiences?.previousCompanies?.map((exp: any, i: number) => (
              <div key={i} className="border border-pink-400/20 p-4">
                <div className="flex w-full items-center justify-between">
                  <p className="py-2 font-bold text-neutral-300">{exp.role}</p>
                  <button className="bg-pink-400 p-1 hover:bg-pink-500">
                    <Pen className="h-4 w-4" />
                  </button>
                </div>
                <p className="py-1 text-sm">{exp.companyName}</p>
                <p className="py-1 text-sm">{exp.jobType}</p>
                <p className="flex items-center py-2 text-sm">
                  <Link className="mr-1 h-4 w-4 text-gray-200" />{' '}
                  {exp.companyWebsite}
                </p>
                <p className="flex items-center py-2 text-sm">{exp.duration}</p>
              </div>
            ))
          ) : (
            <p className="py-3">No experience added yet.</p>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <button className="border border-pink-600 p-3 hover:border-transparent hover:bg-pink-600">
                Add Experience
              </button>
            </SheetTrigger>
            <SheetContent
              side={'right'}
              className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Add Experience</SheetTitle>
              </SheetHeader>
              <div className="flex h-fit w-full flex-col overflow-y-scroll py-10">
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Company name
                  </label>
                  <input
                    type="text"
                    className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Company website link
                  </label>
                  <input
                    type="text"
                    className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <SheetClose className="my-10 bg-white py-2 hover:bg-neutral-300">
                  Add
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
