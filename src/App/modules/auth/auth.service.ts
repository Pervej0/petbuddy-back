import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import generateToken from "../../helper/generateToken";
import CustomError from "../../errors/customError";
const prisma = new PrismaClient();

export const loginUserDB = async (payload: {
  email: string;
  password: string;
}) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const comparePassword = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (!comparePassword) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User dose not exist!");
  }

  const tokenPayload = {
    email: isUserExist.email,
    name: isUserExist.name,
  };

  const accessToken = await generateToken(
    tokenPayload,
    config.ACCESS_TOKEN_SECRET as string,
    config.ACCESS_TOKEN_EXPIRES_IN as string
  );
  const refreshToken = await generateToken(
    tokenPayload,
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_EXPIRES_IN as string
  );

  return {
    refreshToken,
    data: {
      id: isUserExist.id,
      name: isUserExist.name,
      email: isUserExist.email,
      token: accessToken,
    },
  };
};
