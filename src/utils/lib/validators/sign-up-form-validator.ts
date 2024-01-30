import { z } from "zod";

export const SignUpFormScheme = z
  .object({
    fullName: z
      .string()
      .min(4, "Full name must be at least 4 characters")
      .max(45, "Full name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)*$"), "No special character allowed!"),
    email: z.string().email("Email is not valid"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords doesn't match!",
    path: ["confirmPassword"],
  });

export type SignUpFormType = z.infer<typeof SignUpFormScheme>;
