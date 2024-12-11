import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  githubURL: z.string().min(1, 'Github url is required'),
  deployedLink: z.string().min(1, 'Deployed Link  is required'),
  description: z.string().min(1, 'Project description  is required'),
});
