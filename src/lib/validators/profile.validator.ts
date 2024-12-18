import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  avatar: z
    .any()
    .transform((files: FileList | null) => {
      return files && files.length > 0 ? files[0] : null;
    })
    .refine(
      (file: File | null) => {
        if (!file) return true;
        return ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
          file.type,
        );
      },
      { message: 'Invalid file type' },
    )
    .optional(),
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
