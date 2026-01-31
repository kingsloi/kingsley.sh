import { defineCollection, z } from '@nuxt/content'

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/**/*.md',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      starred: z.boolean().optional(),
      createdAt: z.string(),
      updatedAt: z.string().optional(),
      img: z.string().optional(),
      image: z.string().optional(),
      alt: z.string().optional()
    })
  })
}