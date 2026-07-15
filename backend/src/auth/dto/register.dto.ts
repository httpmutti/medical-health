import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { emailSchema, passwordSchema } from './shared.schemas';

export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  phone: z.string().optional(),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
export type RegisterInput = z.infer<typeof RegisterSchema>;
