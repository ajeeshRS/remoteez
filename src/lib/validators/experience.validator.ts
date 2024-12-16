import { z } from 'zod';

export const CreateExperienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyWebsite: z.string().url().min(1, 'Company website is required'),
  duration: z.string().min(1, 'Duration is required'),
  jobType: z.enum(['PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP']),
});

export type CreateExperienceSchemaType = z.infer<typeof CreateExperienceSchema>;

export const UpdateExperienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyWebsite: z.string().url().min(1, 'Company website is required'),
  duration: z.string().min(1, 'Duration is required'),
  jobType: z.enum(['PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP']),
});

export type UpdateExperienceSchemaType = z.infer<typeof UpdateExperienceSchema>;

export const UpdateExperienceRangeSchema = z.object({
  experienceRange: z.enum([
    'ZERO_TO_ONE',
    'ONE_TO_THREE',
    'THREE_TO_SIX',
    'SIX_PLUS',
  ]),
});

export type UpdateExperienceRangeSchemaType = z.infer<
  typeof UpdateExperienceRangeSchema
>;


