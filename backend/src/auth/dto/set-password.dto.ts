import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { emailSchema, otpSchema, passwordSchema } from './shared.schemas';

export const SetPasswordSchema = z
  .object({
    email: emailSchema,
    otp: otpSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export class SetPasswordDto extends createZodDto(SetPasswordSchema) {}
