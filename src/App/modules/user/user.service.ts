import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";
const prisma = new PrismaClient();

export const createUserDB = async (payload: TUser) => {
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.SALT_ROUND) as number
  );

  const modifiedObj = { ...payload };
  modifiedObj.password = hashPassword;

  const user = await prisma.user.create({
    data: modifiedObj,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};
