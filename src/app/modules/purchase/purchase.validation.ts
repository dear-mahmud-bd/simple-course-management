import { z } from 'zod';

const createPurchaseValidationSchema = z.object({
  body: z.object({
    courseId: z.string().min(1, 'Course ID is required'),
    pay: z.number().min(0, 'Pay amount must be at least 0'),
  }),
});

export const PurchaseValidation = {
  createPurchaseValidationSchema,
};
