import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { TUser } from "./user.interface";
const prisma = new PrismaClient();

export const createUserDB = async (payload: TUser) => {
  const user = await prisma.user.create({
    data: payload,
  });
  return user;
};
