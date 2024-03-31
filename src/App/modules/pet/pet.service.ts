import { TPet } from "./pet.interface";
import { Pet, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPetDB = async (payload: TPet) => {
  const petData = await prisma.pet.create({
    data: payload,
  });

  return petData;
};

export const getAllPetDB = async (query: Record<string, unknown>) => {
  const { searchTerm, ...filterdData } = query;
  const searchableFields = ["species", "breed", "location"];

  const queries: Prisma.UserWhereInput[] = [];

  // search query
  if (searchTerm) {
    queries.push({
      OR: searchableFields.map((key) => ({
        [key]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // filter query
  if (filterdData) {
    queries.push({
      AND: Object.keys(filterdData).map((key) => ({
        [key]: {
          equals: filterdData[key],
        },
      })),
    });
  }

  const whereQueries: Prisma.UserWhereInput = { AND: queries };
  console.dir(queries, { depth: "infinity" });
  // return;
  const pets = await prisma.pet.findMany({
    where: whereQueries,
  });

  return pets;
};

export const updatePetDB = async (petId: string, payload: Partial<Pet>) => {
  console.log(petId, payload);

  const update = await prisma.pet.update({
    where: { id: petId },
    data: payload,
  });
  return update;
};
