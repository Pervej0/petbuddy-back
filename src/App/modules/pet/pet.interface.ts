import { petSize, Gender } from "@prisma/client";

export type TPet = {
  name: string;
  species: string;
  photo: string;
  gender: Gender;
  breed: string;
  age: number;
  size: petSize;
  location: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
  specialNeeds: string;
  healthStatus: string;
};
