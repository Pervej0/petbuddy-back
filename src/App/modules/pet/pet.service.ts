import { TPet } from "./pet.interface";
import { Pet, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPetDB = async (payload: TPet) => {
  const petData = await prisma.pet.create({
    data: payload,
  });

  return petData;
};

export const getAllPetDB = async (query: Record<string, unknown>) => {};

export const updatePetDB = async (petId: string, payload: Partial<Pet>) => {
  console.log(petId, payload);

  const update = await prisma.pet.update({
    where: { id: petId },
    data: payload,
  });
  return update;
};
