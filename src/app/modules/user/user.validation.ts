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

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid Email format' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(5, { message: 'Password can not be lower than 5 characters' })
      .max(30, { message: 'Password can not be greater than 30 character' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  userLoginValidationSchema,
};
