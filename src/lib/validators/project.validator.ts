import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string(),
  githubURL: z.string().url(),
  deployedLink: z.string().url(),
  description: z.string(),
  skills: z.array(z.string()),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;

export const ProjectEditSchema = z.object({
  title: z.string(),
  githubURL: z.string().url(),
  deployedLink: z.string().url(),
  description: z.string(),
  skills: z.array(z.string()),
});

export type ProjectEditSchemaType = z.infer<typeof ProjectEditSchema>;
