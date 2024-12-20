'use client';
import { getJobseekerInfo, saveResume } from '@/app/actions/jobseeker/actions';
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
  SaveResumeLinkSchema,
  SaveResumeLinkSchemaType,
} from '@/lib/validators/jobseeker/experience.validator';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useDispatch, UseDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
interface Props {
  resumeLink: string;
}
export default function SaveResumeLink({ resumeLink }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SaveResumeLinkSchemaType>({
    resolver: zodResolver(SaveResumeLinkSchema),
    defaultValues: {
      resume: '',
    },
  });

  const handleEditExperience = async (data: SaveResumeLinkSchemaType) => {
    try {
      setLoading(true);
      const response = await saveResume(data);
      if (response.success) {
        toast.success(response.message);
        fetchProfileDetails();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('Some error occured');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileDetails = async () => {
    try {
      const { jobSeekerProfile } = await getJobseekerInfo();
      if (jobSeekerProfile) {
        dispatch(setJobseekerProfile(jobSeekerProfile));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setValue('resume', resumeLink);
  }, [resumeLink]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="mx-2 cursor-pointer bg-pink-400 p-1 hover:bg-pink-500">
          <Pen className="h-4 w-4" />
        </span>
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit Resume doc link</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleEditExperience)}
          className="flex h-fit w-full flex-col overflow-y-scroll py-10"
        >
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">URL</label>
            <input
              type="text"
              {...register('resume')}
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              placeholder={'Please enter you resume url'}
            />
            <ErrorMessage err={errors.resume} />
          </div>
          <button
            type="submit"
            className="my-10 flex items-center justify-center bg-white py-2 hover:bg-neutral-300"
          >
            {loading ? <Loader /> : 'Save'}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
