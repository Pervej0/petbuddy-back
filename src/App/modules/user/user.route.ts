import express from "express";
import {
  createUser,
  getAUser,
  getAllUser,
  updateUser,
} from "./user.controller";
import {
  UpdateUserValidationSchema,
  userValidationSchema,
} from "./user.zodValidation";
import validationChecker from "../../middleware/validationChecker";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/profile", auth(UserRole.user, UserRole.admin), getAUser);
router.get("/profiles", auth(UserRole.admin), getAllUser);
router.post("/register", validationChecker(userValidationSchema), createUser);
router.put(
  "/profile",
  auth(UserRole.user, UserRole.admin),
  validationChecker(UpdateUserValidationSchema),
  updateUser
);

const userRouter = router;

export default userRouter;
