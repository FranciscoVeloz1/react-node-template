import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Write a correct email"),
  password: z.string().min(1, "Password is required"),
});
