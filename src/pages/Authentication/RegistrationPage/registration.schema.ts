import { z } from "zod";
import { emailSchema, passwordSchema } from "../../../utils/validator";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Името трябва да е поне 2 символа.")
      .max(50, "Името е твърде дълго."),      
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролите не съвпадат.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
