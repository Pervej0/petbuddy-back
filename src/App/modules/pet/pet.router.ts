import express, { NextFunction, Request, Response } from "express";
import {
  createPet,
  deletePet,
  getAllPet,
  getSinglePet,
  updatePet,
} from "./pet.controller";
import validationChecker from "../../middleware/validationChecker";
import {
  UpdatePetValidationSchema,
  petValidationSchema,
} from "./pet.zodValidation";
import auth from "../../middleware/auth";
import uploadFile from "../../middleware/uploadFile";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/pets", auth(UserRole.admin, UserRole.user), getAllPet);
router.get("/pets/:petId", auth(UserRole.admin, UserRole.user), getSinglePet);
router.post(
  "/pets",
  auth(UserRole.admin),
  // uploadFile.upload.array("file", 3),
  (req: Request, res: Response, next: NextFunction) => {
    const data = petValidationSchema.parse(JSON.parse(req.body.data));
    // console.log(data);
    req.body = data;
    return createPet(req, res, next);
  }
);

router.put(
  "/pets/:petId",
  auth(UserRole.admin),
  validationChecker(UpdatePetValidationSchema),
  updatePet
);

router.delete("/pets/:petId", auth(UserRole.admin), deletePet);

const petRouter = router;

export default petRouter;
