import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import { createPetDB } from "./pet.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";

export const createPet: RequestHandler = asyncCatch(async (req, res) => {
  const result = await createPetDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});
