import { z } from "zod";

export const SignInFormScheme = z.object({
  email: z.string().email("Email is not valid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
});

export type SignInFormType = z.infer<typeof SignInFormScheme>;
