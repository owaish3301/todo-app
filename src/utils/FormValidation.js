import { z } from "zod";

const nameSchema = z.string().min(1, "Name can't be empty");

const emailSchema = z.email("Invalid email format");

const passwordRequirements =
  "(?=.*[a-zA-Z])" + // Must contain a letter
  "(?=.*[0-9])" + // Must contain a number
  "(?=.*[^a-zA-Z0-9])" + // Must contain a symbol
  ".*";

const passwordSchema = z
  .string({
    error: (e) => e.input === undefined ? "Password is required" : "Invalid data"
  })
  .min(6, "Password must be at least 6 characters long")
  .regex(
    new RegExp(passwordRequirements),
    "Password must contain at least one letter, one number, and one symbol (e.g., !, @, #)"
  );

export { nameSchema, passwordSchema, emailSchema };