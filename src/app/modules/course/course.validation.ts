import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .trim()
      .min(3, 'Title must be at least 3 characters long.')
      .max(64, 'The title cannot exceed 64 characters.'),
    description: z
      .string({ required_error: 'Description is required' })
      .trim()
      .max(1024, 'Description cannot exceed 1024 characters.'),
    price: z
      .number({ required_error: 'Price is required' })
      .nonnegative('Price must be a positive number'),
    instructor: z
      .string({ required_error: 'Instructor is required' })
      .trim()
      .min(3, 'Instructor must be at least 3 characters long.')
      .max(64, 'Instructor name cannot exceed 64 characters.'),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters long.')
      .max(64, 'The title cannot exceed 64 characters.')
      .optional(),
    description: z
      .string()
      .trim()
      .max(1024, 'Description cannot exceed 1024 characters.')
      .optional(),
    price: z.number().nonnegative('Price must be a positive number').optional(),
    instructor: z
      .string()
      .trim()
      .min(3, 'Instructor must be at least 3 characters long.')
      .max(64, 'Instructor name cannot exceed 64 characters.')
      .optional(),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
