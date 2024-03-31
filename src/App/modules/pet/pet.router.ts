import express from "express";
import { createPet, getAllPet, updatePet } from "./pet.controller";
import validationChecker from "../../middleware/validationChecker";
import {
  UpdatePetValidationSchema,
  petValidationSchema,
} from "./pet.zodValidation";
import auth from "../../middleware/auth";
const router = express.Router();

router.get("/pets", auth(), getAllPet);
router.post("/pets", auth(), validationChecker(petValidationSchema), createPet);
router.put(
  "/pets/:petId",
  auth(),
  validationChecker(UpdatePetValidationSchema),
  updatePet
);

const petRouter = router;

export default petRouter;
