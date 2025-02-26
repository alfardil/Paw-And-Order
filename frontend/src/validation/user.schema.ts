import {z} from 'zod';

export const userSchema = z.object({
    uuid: z.string().default(() => crypto.randomUUID()),
    googleId: z.string(),
    email: z.string().email(),
    joinedAt: z.coerce.date().default(() => new Date()),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    authProvider: z.string(),
})

export type User = z.infer<typeof userSchema>;