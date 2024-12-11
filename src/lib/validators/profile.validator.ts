import { z } from 'zod';

export const personalInfoSchema = z.object({
  email: z.string(),
  fullName: z.string(),
  location: z.string(),
  desiredJobTitle: z.string(),
  bio: z.string(),
  preferredJobType: z.enum([
    'PART_TIME',
    'FULL_TIME',
    'FREELANCE',
    'INTERNSHIP',
  ]),
});

export type personalInfoSchemaType = z.infer<typeof personalInfoSchema>;
