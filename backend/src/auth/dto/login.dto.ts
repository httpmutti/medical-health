import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { emailSchema } from './shared.schemas';

export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export class LoginDto extends createZodDto(LoginSchema) {}
export type LoginInput = z.infer<typeof LoginSchema>;
