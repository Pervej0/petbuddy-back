import { AdoptionRequestStatus } from "@prisma/client";
import z from "zod";

export const adoptionRequestValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "PetId is required" }),
    adoptionDate: z.string({ required_error: "adoptionDate is required!" }),
    petOwnershipExperience: z.string({
      required_error: "PetOwnershipExperience is required!",
    }),
    status: z
      .enum([
        AdoptionRequestStatus.APPROVED,
        AdoptionRequestStatus.PENDING,
        AdoptionRequestStatus.REJECTED,
      ])
      .optional(),
  }),
});

export const UpdateAdoptionRequestValidationSchema = z.object({
  body: z.object({
    petOwnershipExperience: z
      .string({
        required_error: "PetOwnershipExperience is required!",
      })
      .optional(),
    adoptionDate: z
      .string({ required_error: "adoptionDate is required!" })
      .optional(),
    status: z
      .enum([
        AdoptionRequestStatus.APPROVED,
        AdoptionRequestStatus.PENDING,
        AdoptionRequestStatus.REJECTED,
      ])
      .optional(),
  }),
});
