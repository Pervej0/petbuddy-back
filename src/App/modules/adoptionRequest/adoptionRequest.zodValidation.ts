import z from "zod";

export const adoptionRequestValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "PetId is required" }),
    petOwnershipExperience: z.string({
      required_error: "PetOwnershipExperience is required!",
    }),
    status: z.string().optional(),
  }),
});

export const UpdateAdoptionRequestValidationSchema = z.object({
  body: z.object({
    petId: z.string({ required_error: "PetId is required" }),
    petOwnershipExperience: z
      .string({
        required_error: "PetOwnershipExperience is required!",
      })
      .optional(),
    status: z.string().optional(),
  }),
});
