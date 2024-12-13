import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  email: z.string().email(),
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

export type PersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;

export const LinkUpdateSchema = z.object({
  title: z.string(),
  link: z.string().url(),
});

export type LinkUpdateSchemaType = z.infer<typeof LinkUpdateSchema>;
