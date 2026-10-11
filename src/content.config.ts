import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tooltip: z.optional(z.string()),
			caption: z.optional(z.string()),
		}),
});

const fun = defineCollection({
	// Load Markdown and MDX files in the `src/content/fun/` directory.
	loader: glob({ base: './src/content/fun', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			photoGallery: z.string().regex(/^[A-Za-z0-9_-]+$/, 'Use a folder name inside src/assets').optional(),
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tooltip: z.optional(z.string()),
			caption: z.optional(z.string()),
		}),
});

export const collections = { blog, fun };
