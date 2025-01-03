'use client';
import { editProject, getJobseekerInfo } from '@/app/actions/jobseeker/actions';
import ErrorMessage from '@/components/ui/error-msg';
import Loader from '@/components/ui/loader';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  ProjectEditSchema,
  ProjectEditSchemaType,
} from '@/lib/validators/jobseeker/project.validator';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { AppDispatch } from '@/state/store';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pen, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Project } from './Projects';
export default function EditProject({ project }: { project: Project  }) {
  const [input, setInput] = useState('');
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectEditSchemaType>({
    resolver: zodResolver(ProjectEditSchema),
    defaultValues: {
      title: '',
      description: '',
      githubURL: '',
      deployedLink: '',
      skills: [],
    },
  });
  const lowerCaseInput = input.toLowerCase();
  const currentSkills = watch('skills');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (skillSet.includes(lowerCaseInput)) {
        return toast.error('skill already exists');
      }

      if (skillSet.length === 5) {
        return toast.error('Limit reached');
      }

      if (currentSkills.includes(lowerCaseInput)) {
        return toast.error('Skill already exist');
      }

      setValue('skills', [...currentSkills, lowerCaseInput]);
      setSkillSet((prev) => [...prev, lowerCaseInput]);
      setInput('');
    }
  };

  const handleSkillRemoval = (skill: string) => {
    const removedArr = currentSkills.filter((sk) => sk !== skill);
    setValue('skills', removedArr);
    setSkillSet((prev) => prev.filter((sk) => sk !== skill));
  };

  const handleEditProject = async (data: ProjectEditSchemaType) => {
    try {
      setLoading(true);
      const response = await editProject(data, project.id as string);

      if (response.success) {
        toast.success(response.message);
        fetchProfileDetails();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('Some error occured!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (project) {
      reset({
        title: project?.title || '',
        description: project?.description || '',
        githubURL: project?.githubURL || '',
        deployedLink: project?.deployedLink || '',
        skills: project?.skills || [],
      });
      setSkillSet(project?.skills);
    }
  }, [reset,project]);

  const fetchProfileDetails = async () => {
    try {
      const { jobSeekerProfile } = await getJobseekerInfo();
      if (jobSeekerProfile) {
        dispatch(setJobseekerProfile(jobSeekerProfile));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="mx-1 bg-pink-400 p-1 hover:bg-pink-500">
        <Pen className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent
        className="md:h-full h-[100svh] overflow-y-scroll border-l-pink-400/40 bg-black py-10 md:px-56"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit project</SheetTitle>
        </SheetHeader>
        <form
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit((data) => handleEditProject(data))}
          className="flex h-fit w-full flex-col overflow-y-scroll py-4"
        >
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Project title
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.title} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Description
            </label>
            <textarea
              {...register('description')}
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.description} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Github URL
            </label>
            <input
              {...register('githubURL')}
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.githubURL} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Deployed URL
            </label>
            <input
              {...register('deployedLink')}
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.deployedLink} />
          </div>
          <div className="my-5 flex flex-col items-start">
            <div className="flex flex-col">
              <label className="my-1 py-2 text-sm text-neutral-200">
                Add skills by pressing ENTER after typing
              </label>
              <input
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                placeholder="Add skills"
              />
            </div>
            <div className="grid grid-cols-2 py-5">
              {skillSet.map((skill, i) => (
                <p
                  className="my-2 mr-2 flex items-center justify-between text-wrap bg-pink-400/60 px-2 py-1 text-white"
                  key={i}
                >
                  {skill}
                  <X
                    className="mx-1 h-4 w-4 cursor-pointer hover:text-pink-600"
                    onClick={() => handleSkillRemoval(skill)}
                  />
                </p>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="my-10 flex items-center justify-center bg-white py-2 hover:bg-neutral-300"
          >
            {loading ? <Loader /> : 'Update'}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
