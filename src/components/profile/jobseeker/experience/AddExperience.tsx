'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  CreateExperienceSchema,
  CreateExperienceSchemaType,
} from '@/lib/validators/jobseeker/experience.validator';
import {
  addExperience,
  getJobseekerInfo,
} from '@/app/actions/jobseeker/actions';
import Loader from '@/components/ui/loader';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import ErrorMessage from '@/components/ui/error-msg';

export default function AddExperience() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateExperienceSchemaType>({
    resolver: zodResolver(CreateExperienceSchema),
    defaultValues: {
      role: '',
      duration: '',
      companyName: '',
      companyWebsite: '',
      jobType: 'FULL_TIME',
    },
  });

  const jobType = watch('jobType');

  const handleAddExperience = async (data: CreateExperienceSchemaType) => {
    try {
      setLoading(true);
      const response = await addExperience(data);
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
      <SheetTrigger className="border border-pink-600 p-3 hover:border-transparent hover:bg-pink-600">
        Add Experience
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Add Experience</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => handleAddExperience(data))}
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
                placeholder="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mr-1 w-1/2 border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              />
              <input
                type="date"
                placeholder="endDate"
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
            {loading ? <Loader /> : 'Add'}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
