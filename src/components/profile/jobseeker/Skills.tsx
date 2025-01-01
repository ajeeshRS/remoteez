'use client';
import {
  addJobseekerSkill,
  deleteJobseekerSkill,
} from '@/app/actions/jobseeker/actions';
import { RootState } from '@/state/store';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Skills() {
  const skills = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker?.skills,
  );
  const [input, setInput] = useState('');
  const [skillSet, setSkillSet] = useState<string[]>([]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === 'Enter') {
        const skill = input.toLowerCase();

        if (skillSet.includes(skill)) {
          return toast.error('Skill already exists');
        }

        if (skillSet.length === 15) {
          return toast.error('Limit reached');
        }

        setSkillSet((prev) => [...prev, skill]);

        setInput('');

        const response = await addJobseekerSkill(skill);

        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.error);
        }
      }
    } catch (error) {
      toast.error('Some error occured');
      console.log(error);
    }
  };

  const handleSkillRemoval = async (skill: string) => {
    try {
      setSkillSet((prev) => prev.filter((sk) => sk !== skill));

      const response = await deleteJobseekerSkill(skill);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('Some error occured');
      console.log(error);
    }
  };

  useEffect(() => {
    if (skills) {
      setSkillSet(skills);
    }
  }, [skills]);
  return (
    <div className="h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="font-bold text-pink-500"> Skills</p>
        <div className="grid grid-cols-2 py-5 md:grid-cols-3">
          {skillSet?.length === 0 && <p>No skills added yet.</p>}
          {skillSet?.map((skill) => (
            <p
              className="my-2 mr-2 flex items-center justify-between text-nowrap bg-pink-400/30 px-2 py-1"
              key={skill}
            >
              {skill}
              <X
                className="mx-1 h-4 w-4 cursor-pointer hover:text-pink-700"
                onClick={() => handleSkillRemoval(skill)}
              />
            </p>
          ))}
        </div>
        <div className="my-5 flex items-end">
          <div className="flex flex-col">
            <label className="my-1 py-2 text-sm text-neutral-400">
              Add skills by pressing ENTER after typing
            </label>
            <input
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="border border-pink-400/20 bg-transparent px-3 py-2 text-sm text-white outline-none"
              placeholder="Add skills"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
