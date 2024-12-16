'use client';

import {
  getJobseekerInfo,
  UpdateExperienceRange,
} from '@/app/actions/jobseeker/actions';
import Loader from '@/components/ui/loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  UpdateExperienceRangeSchema,
  UpdateExperienceRangeSchemaType,
} from '@/lib/validators/experience.validator';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { AppDispatch } from '@/state/store';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExperienceRange } from '@prisma/client';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

interface Props {
  currentExp: ExperienceRange;
}

export default function EditExperienceRange({ currentExp }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { setValue, handleSubmit } = useForm<UpdateExperienceRangeSchemaType>({
    resolver: zodResolver(UpdateExperienceRangeSchema),
    defaultValues: {
      experienceRange: currentExp,
    },
  });

  const handleEditExperienceRange = async (
    data: UpdateExperienceRangeSchemaType,
  ) => {
    try {
      setLoading(true);
      const response = await UpdateExperienceRange(data.experienceRange);
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
    setValue('experienceRange', currentExp);
  }, [currentExp]);
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
          <SheetTitle className="text-white">Edit experience range</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => handleEditExperienceRange(data))}
          className="flex h-fit w-full flex-col overflow-y-scroll py-10"
        >
          <Select
            defaultValue={currentExp}
            onValueChange={(value: ExperienceRange) =>
              setValue('experienceRange', value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="my-2 h-10 w-full">
              <SelectValue placeholder="Select experience range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ZERO_TO_ONE">0-1 yrs</SelectItem>
              <SelectItem value="ONE_TO_THREE">1-3 yrs</SelectItem>
              <SelectItem value="THREE_TO_SIX">3-6 yrs</SelectItem>
              <SelectItem value="SIX_PLUS">6+ yrs</SelectItem>
            </SelectContent>
          </Select>
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
