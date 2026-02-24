import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(16),
});

export type SignUpSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
});

export type LoginSchemaType = z.infer<typeof loginSchema>;  
