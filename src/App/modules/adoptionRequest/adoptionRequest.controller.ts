import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import {
  createAdoptionRequestDB,
  getAllAdoptionRequestsDB,
  getMyAdoptionRequestsDB,
  updateAdoptionRequestDB,
} from "./adoptionRequest.service";

export const createAdoptionRequest: RequestHandler = asyncCatch(
  async (req: any, res) => {
    const result = await createAdoptionRequestDB(req.body, req.user);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

export const updateAdoptionRequest: RequestHandler = asyncCatch(
  async (req, res) => {
    const result = await updateAdoptionRequestDB(
      req.params.requestId,
      req.body
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Adoption request updated successfully",
      data: result,
    });
  }
);

export const getAllAdoptionRequests: RequestHandler = asyncCatch(
  async (req, res) => {
    const result = await getAllAdoptionRequestsDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);
export const getMyAdoptionRequests: RequestHandler = asyncCatch(
  async (req: any, res) => {
    const result = await getMyAdoptionRequestsDB(req.user);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Your adoption requests retrieved successfully",
      data: result,
    });
  }
);
