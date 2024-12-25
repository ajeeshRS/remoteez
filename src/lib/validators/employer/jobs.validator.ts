import { string, z } from 'zod';

export const CreateJobSchema = z.object({
  title: z.string().min(1, 'job title is required'),
  jobType: z.enum(['PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP']),
  minExp: z.string().min(1, 'min experience is required'),
  maxExp: z.string().min(1, 'max experience is required'),
  jobDesc: z.string().min(1, 'description is required'),
  skills: z.array(string()),
  minSalary: z.string().min(1, 'min salary is required'),
  maxSalary: z.string().min(1, 'max salary is required'),
  currency: z.enum(['INR', 'USD']),
  link: z.string().url(),
});

export type CreateJobSchemaType = z.infer<typeof CreateJobSchema>;

export const UpdateJobSchema = z.object({
  title: z.string().min(1, 'job title is required'),
  jobType: z.enum(['PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP']),
  minExp: z.string().min(1, 'min experience is required'),
  maxExp: z.string().min(1, 'max experience is required'),
  jobDesc: z.string().min(1, 'description is required'),
  skills: z.array(string()),
  minSalary: z.string().min(1, 'min salary is required'),
  maxSalary: z.string().min(1, 'max salary is required'),
  currency: z.enum(['INR', 'USD']),
  link: z.string().url(),
});

export type UpdateJobSchemaType = z.infer<typeof UpdateJobSchema>;