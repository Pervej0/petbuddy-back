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
  const { searchTerm, specialNeeds, ...filterdData } = query;
  const { page, limit, skip } = paginationCalculation(options);
  // console.log(options, paginationCalculation(options));
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

  // filter for special needs
  if (specialNeeds) {
    queries.push({
      specialNeeds: {
        contains: specialNeeds as string,
        mode: "insensitive",
      },
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
      page: page,
      limit: limit,
      total: count,
    },
    data: pets,
  };
};

export const getSinglePetDB = async (petId: string) => {
  const petData = await prisma.pet.findUniqueOrThrow({
    where: { id: petId },
  });

  return petData;
};
export const updatePetDB = async (petId: string, payload: Partial<Pet>) => {
  const update = await prisma.pet.update({
    where: { id: petId },
    data: payload,
  });
  return update;
};

export const deletePetDB = async (petId: string) => {
  const update = await prisma.pet.delete({
    where: { id: petId },
  });
  return update;
};
