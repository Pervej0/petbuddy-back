import express from "express";
import validationChecker from "../../middleware/validationChecker";
import {
  UpdateAdoptionRequestValidationSchema,
  adoptionRequestValidationSchema,
} from "./adoptionRequest.zodValidation";
import {
  createAdoptionRequest,
  deleteAdoptionRequests,
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
  "/adoption-requests",
  auth(UserRole.admin, UserRole.user),
  validationChecker(adoptionRequestValidationSchema),
  createAdoptionRequest
);

router.put(
  "/adoption-requests/:requestId",
  validationChecker(UpdateAdoptionRequestValidationSchema),
  auth(UserRole.admin),
  updateAdoptionRequest
);
router.delete(
  "/adoption-requests/:requestId",
  auth(UserRole.admin, UserRole.user),
  deleteAdoptionRequests
);

const AdoptionRequestRouter = router;

export default AdoptionRequestRouter;
