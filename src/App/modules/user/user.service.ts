import { PrismaClient, User, UserRole, userStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";
import { TJwtDecode } from "../../interface/global.type";
import CustomError from "../../errors/customError";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
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
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return allUser;
};

export const updateUserDB = async (
  user: TJwtDecode,
  payload: Partial<User>
) => {
  await prisma.user.findUniqueOrThrow({
    where: { email: user.email },
  });

  const update = await prisma.user.update({
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

export const deleteUserDB = async (userId: string, user: TJwtDecode) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  if (userInfo.email === user.email) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "You can't modify yourself!"
    );
  }

  const deleteResult = await prisma.user.delete({
    where: { id: userId },
  });

  return deleteResult;
};

export const changeUserRoleAndStatusDB = async (
  payload: {
    email?: string;
    id?: string;
    status?: userStatus;
    role?: UserRole;
  },
  user: JwtPayload
) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { id: payload.id, email: payload.email },
  });
  if (userInfo.email === user.email) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "You can't modify yourself!"
    );
  }

  if (payload.status) {
    return await prisma.user.update({
      where: { id: payload.id },
      data: { status: payload.status },
    });
  }

  await prisma.user.findFirstOrThrow({
    where: { email: payload.email },
    select: {
      email: true,
      password: true,
      id: true,
    },
  });

  const result = await prisma.user.update({
    where: { email: payload.email },
    data: { role: payload.role },
  });

  return result;
};
