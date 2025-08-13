import { z } from "zod";

// ---------------- LOGIN SCHEMA ----------------
export const loginSchema: z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
}> = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z
    .string()
    .min(6, "Password Must Be At Least 6 Characters")
    .max(100, "Password Must Be At Most 100 Characters"),
});

// ---------------- REGISTER SCHEMA ----------------
export const registerSchema: z.ZodObject<{
  name: z.ZodString;
  email: z.ZodString;
  password: z.ZodString;
}> = z.object({
  name: z
    .string()
    .min(2, "Name Must Be At Least 2 Characters")
    .max(50, "Name Must Be At Most 50 Characters"),
  email: z.string().email("Invalid Email Address"),
  password: z
    .string()
    .min(6, "Password Must Be At Least 6 Characters")
    .max(100, "Password Must Be At Most 100 Characters"),
});
