import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(5)
      .max(30),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
