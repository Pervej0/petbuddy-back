import express from "express";
import validationChecker from "../../middleware/validationChecker";
import { adoptionRequestValidationSchema } from "./adoptionRequest.zodValidation";
import { createAdoptionRequest } from "./adoptionRequest.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
  validationChecker(adoptionRequestValidationSchema),
  createAdoptionRequest
);

const AdoptionRequestRouter = router;

export default AdoptionRequestRouter;
