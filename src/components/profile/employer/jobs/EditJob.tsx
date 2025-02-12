import { getEmployerInfo, updateJob } from '@/app/actions/employer/actions';
import { Currency, JobType } from '@/components/profile/employer/jobs/CreateJobForm';
import ErrorMessage from '@/components/ui/error-msg';
import Loader from '@/components/ui/loader';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  UpdateJobSchema,
  UpdateJobSchemaType,
} from '@/lib/validators/employer/jobs.validator';
import { setEmployerProfile } from '@/state/profile/employerSlice';
import { AppDispatch } from '@/state/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Job } from '@prisma/client';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
interface Props {
  job: Job;
}
export default function EditJob({ job }: Props) {
  const [skills, setSkills] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateJobSchemaType>({
    resolver: zodResolver(UpdateJobSchema),
  });

  const handleUpdateJob = async (data: UpdateJobSchemaType) => {
    try {
      setLoading(true);
      const response = await updateJob(data, job.id);
      if (response.success) {
        toast.success(response.message);
        const { employerProfile } = await getEmployerInfo();
        if (employerProfile) {
          dispatch(setEmployerProfile(employerProfile));
        }
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error('Error during creating job : ', error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  useEffect(() => {
    setValue('skills', skills.split(','));
  }, [setValue,skills]);

  useEffect(() => {
    if (job) {
      reset({
        title: job?.title || '',
        jobType: job?.jobType || '',
        jobDesc: job?.description || '',
        minExp: job?.minExperience.toString() || '',
        maxExp: job?.maxExperience.toString() || '',
        minSalary: job?.minSalary.toString() || '',
        maxSalary: job?.maxSalary.toString() || '',
        currency: job?.currency || '',
        skills: job?.skillsRequired || '',
        link: job?.link || '',
      });

      setSkills(job.skillsRequired.join(',').toString());
    }
  }, [reset,job]);

  return (
    <Sheet>
      <SheetTrigger className="mx-1 bg-pink-400 p-1 hover:bg-pink-500">
        <Pen className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent
        className="md:h-full h-[100dvh] overflow-y-scroll border-l-pink-400/40 bg-black py-10 md:px-56"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit Job</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => handleUpdateJob(data))}
          className="w-full bg-transparent py-4 text-white shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <ErrorMessage err={errors.title} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobType"
              className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
            >
              Job Type
            </label>
            <Select onValueChange={(value: JobType) => setValue('jobType', value)}>
              <SelectTrigger className="my-2 h-10 w-full !border-white focus:!ring-pink-500">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(JobType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="minExperience"
                className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
              >
                Min Experience (years)
              </label>
              <input
                type="number"
                id="minExperience"
                {...register('minExp')}
                min="0"
                className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label
                htmlFor="maxExperience"
                className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
              >
                Max Experience (years)
              </label>
              <input
                type="number"
                id="maxExperience"
                {...register('maxExp')}
                min="0"
                className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
            >
              Job Description
            </label>
            <textarea
              id="description"
              {...register('jobDesc')}
              required
              rows={4}
              className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="skillsRequired"
              className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
            >
              Skills Required (comma-separated)
            </label>
            <input
              type="text"
              id="skillsRequired"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <div className="mx-1">
                <label
                  htmlFor="minSalary"
                  className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
                >
                  Min Salary(Per annum)
                </label>
                <input
                  type="number"
                  id="minSalary"
                  {...register('minSalary')}
                  min="0"
                  className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="mx-1">
                <label
                  htmlFor="maxSalary"
                  className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
                >
                  Max Salary(Per annum)
                </label>
                <input
                  type="number"
                  id="maxSalary"
                  {...register('maxSalary')}
                  min="0"
                  className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="currency"
                className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
              >
                Currency
              </label>
              <select
                id="currency"
                {...register('currency')}
                className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {Object.values(Currency).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="link"
              className="mb-1 block text-xs font-medium text-gray-400 md:text-sm"
            >
              Application Link
            </label>
            <input
              type="url"
              id="link"
              {...register('link')}
              className="w-full border bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="flex items-center justify-center bg-pink-600 px-6 py-2 text-white hover:bg-pink-700 focus:outline-none"
            >
              {loading ? <Loader /> : 'Update Job'}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
