import z from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name field is required." })
      .min(1, { message: "Name must not be empty" }),
    email: z
      .string({ required_error: "Email must be a valid email address." })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ required_error: "Password field is required." })
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name field is required." })
      .min(1, { message: "Name must not be empty" })
      .optional(),
    email: z
      .string({ required_error: "Email must be a valid email address." })
      .email({ message: "Invalid email format" })
      .optional(),
    password: z
      .string({ required_error: "Password field is required." })
      .min(6, { message: "Password must be at least 6 characters long" })
      .optional(),
  }),
});
