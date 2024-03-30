import express from "express";
import { createPet } from "./pet.controller";
import validationChecker from "../../middleware/validationChecker";
import { petValidationSchema } from "./pet.zodValidation";
const router = express.Router();

router.post("/pets", validationChecker(petValidationSchema), createPet);

const petRouter = router;

export default petRouter;
