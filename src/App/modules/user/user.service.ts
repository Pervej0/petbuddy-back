import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";
import { TJwtDecode } from "../../interface/global.type";
const prisma = new PrismaClient();

export const createUserDB = async (payload: TUser) => {
  payload.status = "activate";
  payload.role = "user";

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
      role: true,
      status: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const getAllUserDB = async () => {
  const allUser = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      status: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return allUser;
};
export const getAUserDB = async (payload: TJwtDecode) => {
  const allUser = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return allUser;
};

export const updateUserDB = (user: TJwtDecode, payload: Partial<User>) => {
  const update = prisma.user.update({
    where: { email: user.email },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return update;
};

export const deleteUserDB = (userId: string) => {
  const deleteResult = prisma.user.delete({
    where: { id: userId },
  });

  return deleteResult;
};
