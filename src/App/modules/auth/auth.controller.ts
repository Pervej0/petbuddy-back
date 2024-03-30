import { RequestHandler } from "express";
import { loginUserDB } from "./auth.service";
import asyncCatch from "../../shared/asyncCatch";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";

export const loginUser: RequestHandler = asyncCatch(async (req, res) => {
  const result = await loginUserDB(req.body);
  res.cookie("refreshToken", result.refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User logged in successfully",
    data: result.data,
  });
});
