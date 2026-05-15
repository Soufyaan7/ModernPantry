import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ base: './src/content/recipes', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string().default("user"),
      publishDate: z.coerce.date(),
      category: z.string(),
      description: z.string(),
      ingredients: z.array(z.string()),
      directions: z.array(z.string()),
      relatedEquipment: z.array(z.string()).optional(),
      image: z.string().optional(),
      rating: z.number().optional().default(5),
      time: z.string().optional(),
      featured: z.boolean().default(false)
    }),
});

const kitchenFinds = defineCollection({
  loader: glob({ base: './src/content/kitchen-finds', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      features: z.array(z.string()),
      description: z.string(),
      price: z.number(),
      affiliateLink: z.string(),
      shippingType: z.string(),
      category: z.string().default("Gadgets"),
      image: z.string().optional(),
      images: z.array(z.string()).optional(),
      featured: z.boolean().default(false)
    }),
});

export const collections = { recipes, 'kitchen-finds': kitchenFinds };
