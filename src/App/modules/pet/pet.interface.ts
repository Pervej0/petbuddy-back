import { petSize } from "@prisma/client";

export type TPet = {
  name: string;
  species: string;
  breed: string;
  age: number;
  size: petSize;
  location: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
};
