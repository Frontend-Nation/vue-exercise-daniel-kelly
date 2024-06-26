import { z } from "zod";

export const registerValidator = z.object({
  email: z
    .string()
    .email()
    .refine(
      async (email) => {
        if (!email) return true;
        const res = await $fetch(`/api/user-exists?email=${email}`);
        return !res.exists;
      },
      {
        message: "Email already exists",
      }
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  age: z.coerce.number().int().positive().min(18, { message: "Must be 18+" }),
});

export const userAlreadyExistsValidator = z.object({
  email: z.string().email(),
});
