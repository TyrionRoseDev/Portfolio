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
    // Still frame shown before the video loads.
    poster: z.string().optional(),
    // Extra screenshots shown on the project page, same path rules as `image`.
    gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    // Shows an "In progress" badge on the card and project page.
    status: z.enum(['live', 'in-progress']).default('live'),
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
  schema: ({ image }) => z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    credentialId: z.string(),
    credentialUrl: z.string(),
    // Path relative to the Markdown file, like project images.
    image: image().optional(),
    skills: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = { projects, resume, certificates };
