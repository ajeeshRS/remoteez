'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Pen } from 'lucide-react';
import { toast } from 'sonner';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  UpdateExperienceSchema,
  UpdateExperienceSchemaType,
} from '@/lib/validators/jobseeker/experience.validator';
import Loader from '@/components/ui/loader';
import { extractDates } from '@/lib/utils';
import {
  getJobseekerInfo,
  updateExperience,
} from '@/app/actions/jobseeker/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import ErrorMessage from '@/components/ui/error-msg';

export default function EditExperience({ experience }: any) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateExperienceSchemaType>({
    resolver: zodResolver(UpdateExperienceSchema),
    defaultValues: {
      role: '',
      duration: '',
      companyName: '',
      companyWebsite: '',
      jobType: 'FULL_TIME',
    },
  });

  const jobType = watch('jobType');

  const handleEditExperience = async (
    data: UpdateExperienceSchemaType,
    expId: string,
  ) => {
    try {
      setLoading(true);
      const response = await updateExperience(data, expId);
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

  useEffect(() => {
    if (experience) {
      reset({
        role: experience.role || '',
        duration: experience.duration || '',
        companyName: experience.companyName || '',
        companyWebsite: experience.companyWebsite || '',
        jobType: experience.jobType || '',
      });

      const { start, end } = extractDates(experience.duration);

      setStartDate(start);
      setEndDate(end);
    }
  }, [experience]);

  useEffect(() => {
    if (startDate && endDate) {
      setValue('duration', `${startDate} ~ ${endDate}`);
    }
  }, [startDate, endDate]);

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
  return (
    <Sheet>
      <SheetTrigger className="mx-4 bg-pink-400 p-1 hover:bg-pink-500">
        <Pen className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit Experience</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) =>
            handleEditExperience(data, experience.id),
          )}
          className="flex h-fit w-full flex-col overflow-y-scroll py-10"
        >
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">Role</label>
            <input
              {...register('role')}
              type="text"
              className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.role} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Company name
            </label>
            <input
              {...register('companyName')}
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.companyName} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Company website link
            </label>
            <input
              {...register('companyWebsite')}
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.companyWebsite} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Duration (Start/End)
            </label>
            <div className="flex w-full items-center">
              <input
                type="date"
                placeholder="Years"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mr-1 w-1/2 border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              />
              <input
                type="date"
                placeholder="Months"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-1/2 border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <ErrorMessage err={errors.duration} />
          </div>
          <Select
            onValueChange={(value: any) => setValue('jobType', value)}
            value={jobType}
          >
            <label className="my-1 py-2 text-sm text-neutral-200">
              Job type
            </label>{' '}
            <SelectTrigger className="h-10 w-full border-pink-400/60">
              <SelectValue className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PART_TIME">Part time</SelectItem>
              <SelectItem value="FULL_TIME">Full time</SelectItem>
              <SelectItem value="FREELANCE">Freelance</SelectItem>
              <SelectItem value="INTERNSHIP">Internship</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage err={errors.jobType} />
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
