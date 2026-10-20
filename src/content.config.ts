import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.enum(['AI', 'Physics', 'Markets', 'Other']).default('Other'),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const studio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/studio' }),
  schema: z.object({
    title: z.string(),
    year: z.union([z.string(), z.number()]).optional(),
    medium: z.string().optional(),
    image: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, studio };
