import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import { createUserDB, getAllUsersDB } from "./user.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";

export const getAllUsers: RequestHandler = asyncCatch(async (req, res) => {
  const result = await getAllUsersDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const createUser: RequestHandler = asyncCatch(async (req, res) => {
  const result = await createUserDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully",
    data: result,
  });
});
