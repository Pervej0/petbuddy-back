import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import {
  changeUserRoleAndStatusDB,
  createUserDB,
  deleteUserDB,
  getAUserDB,
  getAllUserDB,
  updateUserDB,
} from "./user.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";

export const getAUser: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await getAUserDB(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});
export const getAllUser: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await getAllUserDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All user profile retrieved successfully",
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

export const updateUser: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await updateUserDB(req.user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

export const deleteUser: RequestHandler = asyncCatch(async (req: any, res) => {
  console.log(req.params.userId, "yyy");
  const result = await deleteUserDB(req.params.userId, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User profile deleted successfully",
    data: result,
  });
});

export const changeUserRoleAndStatus: RequestHandler = asyncCatch(
  async (req: any, res) => {
    const result = await changeUserRoleAndStatusDB(req.body, req.user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "User meta updated successfully",
      data: result,
    });
  }
);
