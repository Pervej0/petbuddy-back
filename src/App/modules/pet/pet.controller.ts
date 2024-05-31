import { RequestHandler } from "express";
import asyncCatch from "../../shared/asyncCatch";
import {
  createPetDB,
  deletePetDB,
  getAllPetDB,
  getSinglePetDB,
  updatePetDB,
} from "./pet.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";
import pickFields from "../../helper/pickFields";
import {
  PetPaginationOptions,
  PetSortByOptions,
  filterAndSearchOptions,
} from "./pet.utils";

export const createPet: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await createPetDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});

export const getSinglePet: RequestHandler = asyncCatch(
  async (req: any, res) => {
    const result = await getSinglePetDB(req.params.petId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Pet retrieved successfully",
      data: result,
    });
  }
);

export const updatePet: RequestHandler = asyncCatch(async (req: any, res) => {
  const result = await updatePetDB(req.params.petId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Pet profile updated successfully",
    data: result,
  });
});

export const deletePet: RequestHandler = asyncCatch(async (req, res) => {
  const result = await deletePetDB(req.params.petId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Pet profile deleted successfully",
    data: result,
  });
});

export const getAllPet: RequestHandler = asyncCatch(async (req: any, res) => {
  const filterAndSearcheFields = pickFields(req.query, filterAndSearchOptions);
  const petPeginationFields = pickFields(req.query, PetPaginationOptions);
  const sortFields = pickFields(req.query, PetSortByOptions);

  const result = await getAllPetDB(
    filterAndSearcheFields,
    petPeginationFields,
    sortFields
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Pets retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});
