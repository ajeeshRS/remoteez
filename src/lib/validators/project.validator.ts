import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  githubURL: z.string().url().min(1, 'Github url is required'),
  deployedLink: z.string().url().min(1, 'Deployed link is required'),
  description: z.string().min(1, 'Description is required'),
  skills: z.array(z.string()).min(1, 'Skills is required'),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;

export const ProjectEditSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  githubURL: z.string().url().min(1, 'Github url is required'),
  deployedLink: z.string().url().min(1, 'Deployed link is required'),
  description: z.string().min(1, 'Description is required'),
  skills: z.array(z.string()).min(1, 'Skills is required'),
});

export type ProjectEditSchemaType = z.infer<typeof ProjectEditSchema>;
