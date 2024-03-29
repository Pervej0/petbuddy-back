import z from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name must not be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name must not be empty" }).optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .optional(),
  }),
});
