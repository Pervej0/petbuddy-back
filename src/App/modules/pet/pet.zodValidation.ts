import { petSize } from "@prisma/client";
import z from "zod";

export const petValidationSchema = z.object({
  name: z.string({ required_error: "Pet name is required!" }).min(2),
  species: z.string({ required_error: "Species is required!" }).max(50),
  breed: z.string({ required_error: "Breed is required with 15 length" }),
  age: z
    .number({ required_error: "Age is required!" })
    .int()
    .positive({ message: "Must be positive number" }),
  photos: z.array(z.string()).optional(),
  size: z.enum(["large", "medium", "small"]),
  gender: z.enum(["male", "female"]),
  location: z.string({ required_error: "Location is required!" }),
  description: z.string({ required_error: "Description is required!" }),
  temperament: z
    .string({ required_error: "Temperament is required!" })
    .regex(/^[\w\s,-]+$/i),
  medicalHistory: z.string({ required_error: "medicalHistory is required!" }),
  adoptionRequirements: z.string({
    required_error: "Adoption requirements is required!",
  }),
  specialNeeds: z.string({ required_error: "SpecialNeeds is required!" }),
  healthStatus: z.string({ required_error: "healthStatus is required!" }),
});

export const UpdatePetValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Pet name is required!" })
      .min(2)
      .optional(),
    species: z
      .string({ required_error: "Species is required!" })
      .max(50)
      .optional(),
    breed: z
      .string({ required_error: "Breed is required with 15 length" })
      .optional(),
    age: z
      .number({ required_error: "Age is required!" })
      .int()
      .positive({ message: "Must be positive number" })
      .optional(),
    gender: z.enum(["male", "female"]),
    size: z.enum([petSize.large, petSize.medium, petSize.small]).optional(),
    location: z.string({ required_error: "Location is required!" }).optional(),
    description: z
      .string({ required_error: "Description is required!" })
      .optional(),
    temperament: z
      .string({ required_error: "Temperament is required!" })
      .regex(/^[\w\s,-]+$/i)
      .optional(),
    medicalHistory: z
      .string({ required_error: "MedicalHistory is required!" })
      .optional(),
    adoptionRequirements: z
      .string({
        required_error: "Adoption requirements is required!",
      })
      .optional(),
    specialNeeds: z
      .string({ required_error: "SpecialNeeds is required!" })
      .optional(),
    healthStatus: z
      .string({ required_error: "healthStatus is required!" })
      .optional(),
  }),
});
