import express from "express";
import {
  createUser,
  deleteUser,
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
import { deleteUserDB } from "./user.service";
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

router.delete("/profiles/:userId", auth(UserRole.admin), deleteUser);

const userRouter = router;

export default userRouter;
