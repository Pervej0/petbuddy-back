import express from "express";
import validationChecker from "../../middleware/validationChecker";
import {
  UpdateAdoptionRequestValidationSchema,
  adoptionRequestValidationSchema,
} from "./adoptionRequest.zodValidation";
import {
  createAdoptionRequest,
  updateAdoptionRequest,
} from "./adoptionRequest.controller";
import auth from "../../middleware/auth";
const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
  validationChecker(adoptionRequestValidationSchema),
  createAdoptionRequest
);

router.put(
  "/adoption-requests/:requestId",
  validationChecker(UpdateAdoptionRequestValidationSchema),
  auth(),
  updateAdoptionRequest
);

const AdoptionRequestRouter = router;

export default AdoptionRequestRouter;
