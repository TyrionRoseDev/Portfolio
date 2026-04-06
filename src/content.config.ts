import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    label: z.string(),
    year: z.number(),
    role: z.string(),
    timeline: z.string(),
    status: z.string(),
    tech: z.array(z.string()),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

const resume = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume' }),
  schema: z.object({
    experience: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      })
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
        year: z.string(),
      })
    ),
    skills: z.object({
      languages: z.array(z.string()),
      frontend: z.array(z.string()),
      backend: z.array(z.string()),
      tools: z.array(z.string()),
    }),
  }),
});

export const collections = { projects, resume };
