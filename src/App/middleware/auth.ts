import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/customError";
import { StatusCodes } from "http-status-codes";
import decodedToken from "../helper/decodedToken";
import config from "../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Unauthorized Access");
      }
      const decode = decodedToken(
        token,
        config.ACCESS_TOKEN_SECRET as Secret
      ) as JwtPayload;

      if (Object.entries(decode).length < 1) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Unauthorized Access");
      }

      const userCredentials = await prisma.user.findUniqueOrThrow({
        where: { email: decode.email },
      });

      if (roles.length && !roles.includes(userCredentials.role)) {
        throw new CustomError(StatusCodes.FORBIDDEN, "Forbidden To Access!");
      }

      req.user = decode;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
