import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { emailSchema } from './shared.schemas';

export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export class ForgotPasswordDto extends createZodDto(ForgotPasswordSchema) {}
