import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Моля, въведи имейл.")
  .email("Моля, въведи валиден имейл.");

export const passwordSchema = z
  .string()
  .min(8, "Паролата трябва да е поне 8 символа.")
  .regex(/[A-Za-z]/, "Паролата трябва да съдържа поне една буква.")
  .regex(/\d/, "Паролата трябва да съдържа поне една цифра.");
