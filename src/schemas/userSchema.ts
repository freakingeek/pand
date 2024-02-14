import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).optional(),
  username: z.string().min(3).max(50).optional(),
});
