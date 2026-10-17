import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Plain URL string (e.g. /images/uploads/foo.jpg) so images uploaded
		// through the CMS work without needing a build-time asset import.
		heroImage: z.string().optional(),
	}),
});

const pages = defineCollection({
	// Standalone pages (e.g. About) edited through the CMS as single files.
	loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		// Whether this page gets a link in the site header nav.
		showInNav: z.boolean().default(false),
	}),
});

export const collections = { blog, pages };
