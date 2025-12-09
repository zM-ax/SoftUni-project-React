import { z } from "zod";
import { emailSchema } from "../../../utils/validator";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Моля, въведи парола!"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
