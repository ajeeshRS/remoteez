import { z } from 'zod';

export const JobSeekerSignupSchema = z.object({
  email: z.string().email('Invalid Email').min(1, 'Email is required'),
  fullname: z.string().min(1, 'Fullname is required'),
  password: z.string().min(1, 'Password is required'),
  experience: z.string().min(1, 'Experience is required'),
  desiredJobTitle: z.string().min(1, 'Desired job title is required'),
  currentLocation: z.string().min(1, 'Current location is required'),
});

export type JobSeekerSignupSchemaType = z.infer<typeof JobSeekerSignupSchema>;

export const EmployerSignupSchema = z
  .object({
    email: z.string().email('Invalid Email').min(1, 'Email is required'),
    companyName: z.string().min(1, 'Company name is required'),
    password: z.string().min(1, 'Password is required'),
    role: z.string().min(1, 'Role is required'),
    companyLocation: z.string().min(1, 'Company location is required'),
  })

export type EmployerSignupSchemaType = z.infer<typeof EmployerSignupSchema>;
