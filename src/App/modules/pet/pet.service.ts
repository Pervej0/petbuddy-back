import { TPet } from "./pet.interface";
import { Pet, Prisma, PrismaClient } from "@prisma/client";
import { searchableFields, sortByOptionsFields } from "./pet.utils";
import paginationCalculation from "../../shared/paginationCalculation";
import CustomError from "../../errors/customError";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

export const createPetDB = async (payload: TPet) => {
  const petData = await prisma.pet.create({
    data: payload,
  });

  return petData;
};

export const getAllPetDB = async (
  query: Record<string, unknown>,
  options: Record<string, unknown>,
  sortOptions: Record<string, unknown>
) => {
  const { searchTerm, ...filterdData } = query;
  const { page, limit, skip } = paginationCalculation(options);

  const queries: Prisma.PetWhereInput[] = [];

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
  if (Object.entries(filterdData).length > 0) {
    queries.push({
      AND: Object.keys(filterdData).map((key) => {
        if (key === "age") {
          return {
            age: {
              equals: Number(filterdData[key]),
            },
          };
        } else {
          return {
            [key]: {
              equals: filterdData[key],
            },
          };
        }
      }),
    });
  }
  const whereQueries: Prisma.PetWhereInput = { AND: queries };

  if (
    Object.entries(sortOptions).length > 0 &&
    !sortByOptionsFields.includes(sortOptions.sortBy as string)
  ) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      "You are only allowed to sort by specific fields!"
    );
  }

  const pets = await prisma.pet.findMany({
    where: whereQueries,
    skip,
    take: limit,
    orderBy: {
      [sortOptions.sortBy as string]: sortOptions.sortOrder,
    },
  });

  const count = await prisma.pet.count({
    where: whereQueries,
  });

  return {
    meta: {
      page: 1,
      limit: 1,
      total: count,
    },
    data: pets,
  };
};

export const updatePetDB = async (petId: string, payload: Partial<Pet>) => {
  const update = await prisma.pet.update({
    where: { id: petId },
    data: payload,
  });
  return update;
};
