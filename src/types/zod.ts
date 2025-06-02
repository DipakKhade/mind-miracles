import { z } from 'zod';

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  whatsapp: z
    .string()
    .min(10, 'WhatsApp number must be at least 10 digits')
    .max(15, 'WhatsApp number must be less than 15 digits')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  age: z
    .string()
    .min(1, 'Age is required')
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 100;
    }, 'Age must be between 16 and 100'),
});
