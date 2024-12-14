import { z } from 'zod';

export const CreateExperienceSchema = z.object({
  role: z.string(),
  companyName: z.string(),
  companyWebsite: z.string().url(),
  duration: z.string(),
  jobType: z.enum(['PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP']),
});

export type CreateExperienceSchemaType = z.infer<typeof CreateExperienceSchema>;

export const UpdateExperienceSchema = z.object({
  role: z.string(),
  companyName: z.string(),
  companyWebsite: z.string().url(),
  duration: z.string(),
  jobType: z.enum(['PART_TIME', 'FULL_TIME', 'FREELANCE', 'INTERNSHIP']),
});

export type UpdateExperienceSchemaType = z.infer<typeof UpdateExperienceSchema>;
