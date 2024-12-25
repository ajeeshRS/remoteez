import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobSchema,
  CreateJobSchemaType,
} from '@/lib/validators/employer/jobs.validator';
import { useEffect, useState } from 'react';
import { createJob } from '@/app/actions/employer/actions';
import { toast } from 'sonner';
import ErrorMessage from '../ui/error-msg';
import Loader from '../ui/loader';

enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  INTERNSHIP = 'INTERNSHIP',
  FREELANCE = 'FREELANCE',
}

enum Currency {
  INR = 'INR',
  USD = 'USD',
}
export default function CreateJobForm() {
  const [skills, setSkills] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<CreateJobSchemaType>({
    resolver: zodResolver(CreateJobSchema),
  });

  const handleCreateJob = async (data: CreateJobSchemaType) => {
    try {
      setLoading(true);
      const response = await createJob(data);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
      console.log(response);
    } catch (error) {
      console.error('Error during creating job : ', error);
    } finally {
      setLoading(false);
      reset()
    }
  };

  useEffect(() => {
    setValue('skills', skills.split(','));
  }, [skills]);
  return (
    <div className="flex h-full w-full flex-col items-start text-white">
      <form
        onSubmit={handleSubmit(handleCreateJob)}
        className="mx-auto mt-8 max-w-2xl rounded-lg bg-transparent p-6 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Create New Job</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
            className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
          >
            Job Type
          </label>
          <Select onValueChange={(value: any) => setValue('jobType', value)}>
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
              className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
              className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
            className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
            className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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

        <div className="mb-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="minSalary"
              className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
          <div>
            <label
              htmlFor="maxSalary"
              className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
          <div>
            <label
              htmlFor="currency"
              className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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
            className="mb-1 block md:text-sm text-xs font-medium text-gray-400"
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

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center bg-pink-600 px-6 py-2 text-white hover:bg-pink-700 focus:outline-none"
          >
            {loading ? <Loader /> : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
}
