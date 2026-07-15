import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { emailSchema, otpSchema } from './shared.schemas';

export const VerifyOtpSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
});

export class VerifyOtpDto extends createZodDto(VerifyOtpSchema) {}
