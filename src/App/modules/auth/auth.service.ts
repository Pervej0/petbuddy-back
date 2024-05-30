import { PrismaClient, userStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import generateToken from "../../helper/generateToken";
import CustomError from "../../errors/customError";
import { JwtPayload } from "jsonwebtoken";
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

  if (isUserExist.status === userStatus.deactivate) {
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      "Your account is currently deactivated, please try agin!"
    );
  }

  const comparePassword = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (!comparePassword) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      "Please, Enter correct password!"
    );
  }

  const tokenPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
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

export const changePasswordDB = async (
  user: JwtPayload,
  payload: { newPassword: string; oldPassword: string }
) => {
  const getUser = await prisma.user.findUniqueOrThrow({
    where: { email: user.email, status: userStatus.activate },
  });

  const comparePassword = await bcrypt.compare(
    payload.oldPassword,
    getUser.password
  );

  if (!comparePassword) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      "Please, Enter correct password!"
    );
  }
  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.SALT_ROUND) as number
  );

  await prisma.user.update({
    where: {
      email: getUser.email,
    },
    data: {
      password: hashPassword,
    },
  });

  return "updatePassword";
};
