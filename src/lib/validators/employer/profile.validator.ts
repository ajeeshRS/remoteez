import { z } from 'zod';

export const EmployerInfoSchema = z.object({
  logo: z
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
  name: z.string(),
  companyName: z.string(),
  companyLocation: z.string(),
  description: z.string(),
  foundedYear: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value), {
      message: 'Founded year must be a valid number',
    }),
  teamSize: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => !isNaN(value), {
      message: 'Team size must be a valid number',
    }),
  role: z.enum(['FOUNDER', 'HR', 'CEO']),
});

export type EmployerInfoSchemaType = z.infer<typeof EmployerInfoSchema>;

export const EmployerInfoUpdateSchema = z.object({
  logo: z
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
  name: z.string(),
  companyName: z.string(),
  companyLocation: z.string(),
  description: z.string(),
  foundedYear: z.number(),
  teamSize: z.number(),
  role: z.enum(['FOUNDER', 'HR', 'CEO']),
});

export type EmployerInfoUpdateSchemaType = z.infer<
  typeof EmployerInfoUpdateSchema
>;
