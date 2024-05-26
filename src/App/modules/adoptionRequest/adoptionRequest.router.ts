import express from "express";
import validationChecker from "../../middleware/validationChecker";
import {
  UpdateAdoptionRequestValidationSchema,
  adoptionRequestValidationSchema,
} from "./adoptionRequest.zodValidation";
import {
  createAdoptionRequest,
  getAllAdoptionRequests,
  getMyAdoptionRequests,
  updateAdoptionRequest,
} from "./adoptionRequest.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/adoption-requests", auth(UserRole.admin), getAllAdoptionRequests);
router.get(
  "/adoption-requests/my-request",
  auth(UserRole.admin, UserRole.user),
  getMyAdoptionRequests
);

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
