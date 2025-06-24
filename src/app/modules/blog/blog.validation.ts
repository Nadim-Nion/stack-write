import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Blog title is required' }),
    content: z.string({ required_error: 'Blog content is required' }),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
};
