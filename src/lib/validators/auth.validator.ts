import { z } from 'zod';

export const experienceRangeEnum = z.enum([
  'ZERO_TO_ONE',
  'ONE_TO_THREE',
  'THREE_TO_SIX',
  'SIX_PLUS',
]);

export const employerRoleEnum = z.enum(['HR', 'CEO', 'FOUNDER']);

export const JobSeekerSignupSchema = z.object({
  email: z.string().email('Invalid Email').min(1, 'Email is required'),
  fullname: z.string().min(1, 'Fullname is required'),
  password: z.string().min(1, 'Password is required'),
  experience: experienceRangeEnum,
  desiredJobTitle: z.string().min(1, 'Desired job title is required'),
  currentLocation: z.string().min(1, 'Current location is required'),
});

export type JobSeekerSignupSchemaType = z.infer<typeof JobSeekerSignupSchema>;

export const EmployerSignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid Email').min(1, 'Email is required'),
  companyName: z.string().min(1, 'Company name is required'),
  password: z.string().min(1, 'Password is required'),
  role: employerRoleEnum,
  companyLocation: z.string().min(1, 'Company location is required'),
});

export type EmployerSignupSchemaType = z.infer<typeof EmployerSignupSchema>;

export const SigninSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
