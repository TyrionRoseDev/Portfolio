import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    label: z.string(),
    year: z.number(),
    tech: z.array(z.string()),
    featured: z.boolean().default(false),
    // Screenshot path relative to the Markdown file (e.g. ../../assets/projects/x.png),
    // so Astro can resize it and serve AVIF/WebP.
    image: image().optional(),
    video: z.string().optional(),
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
        school: z.string().optional(),
        year: z.string().optional(),
        note: z.string().optional(),
      })
    ),
    skills: z.object({
      frontend: z.array(z.string()),
      design: z.array(z.string()),
      backend: z.array(z.string()),
      tools: z.array(z.string()),
    }),
  }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certificates' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    credentialId: z.string(),
    credentialUrl: z.string(),
    image: z.string().optional(),
    skills: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { projects, resume, certificates };
