'use client';
import {
  addOrEditLinks,
  getJobseekerInfo,
} from '@/app/actions/jobseeker/actions';
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
  LinkUpdateSchema,
  LinkUpdateSchemaType,
} from '@/lib/validators/jobseeker/profile.validator';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { AppDispatch } from '@/state/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

interface Props {
  link: {
    key: string;
    value: string;
  };
}

export default function EditLink({ link }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkUpdateSchemaType>({
    resolver: zodResolver(LinkUpdateSchema),
    defaultValues: {
      title: '',
      link: '',
    },
  });

  const handleSavingLink = async (data: LinkUpdateSchemaType) => {
    try {
      setLoading(true);
      const response = await addOrEditLinks(data);
      if (response.success) {
        toast.success(response.message);
        fetchProfileDetails();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Some error occured');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue('title', link.key);
    setValue('link', link.value);
  }, [setValue, link]);

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
    <Sheet key={link.key}>
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
          <SheetTitle className="text-white">Edit {link.key}</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => handleSavingLink(data))}
          className="flex h-fit w-full flex-col overflow-y-scroll py-10"
        >
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">URL</label>
            <input
              type="text"
              {...register('link')}
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              placeholder={`enter your ${link.key} url`}
              defaultValue={link.value ? link.value : ''}
            />
            <ErrorMessage err={errors.link} />
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
