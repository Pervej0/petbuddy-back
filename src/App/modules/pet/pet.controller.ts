import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import { createPetDB, getAllPetDB, updatePetDB } from "./pet.service";
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

export const updatePet: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await updatePetDB(req.params.petId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Pet profile updated successfully",
    data: result,
  });
});

export const getAllPet: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await getAllPetDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Pets retrieved successfully",
    data: result,
  });
});
