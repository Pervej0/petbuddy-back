import { TPet } from "./pet.interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPetDB = async (payload: TPet) => {
  const petData = await prisma.pet.create({
    data: payload,
  });

  return petData;
};
