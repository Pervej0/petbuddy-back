import express, { NextFunction, Request, Response } from "express";
import { createPet, getAllPet, updatePet } from "./pet.controller";
import validationChecker from "../../middleware/validationChecker";
import {
  UpdatePetValidationSchema,
  petValidationSchema,
} from "./pet.zodValidation";
import auth from "../../middleware/auth";
import uploadFile from "../../middleware/uploadFile";
const router = express.Router();

router.get("/pets", auth(), getAllPet);
router.post(
  "/pets",
  auth(),
  // validationChecker(petValidationSchema),
  uploadFile.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    const data = petValidationSchema.parse(JSON.parse(req.body.data));
    // console.log(data);
    req.body = data;
    return createPet(req, res, next);
  }
);

router.put(
  "/pets/:petId",
  auth(),
  validationChecker(UpdatePetValidationSchema),
  updatePet
);

const petRouter = router;

export default petRouter;
