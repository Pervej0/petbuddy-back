import express from "express";
import {
  changeUserRoleAndStatus,
  createUser,
  deleteUser,
  getAUser,
  getAllUser,
  updateUser,
} from "./user.controller";
import {
  UpdateUserRoleValidationSchema,
  UpdateUserValidationSchema,
  userValidationSchema,
} from "./user.zodValidation";
import validationChecker from "../../middleware/validationChecker";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/profile", auth(UserRole.user, UserRole.admin), getAUser);
router.get("/profiles", getAllUser);
router.post("/register", validationChecker(userValidationSchema), createUser);
router.put(
  "/profile",
  auth(UserRole.user, UserRole.admin),
  validationChecker(UpdateUserValidationSchema),
  updateUser
);
router.delete("/profiles/:userId", auth(UserRole.admin), deleteUser);
router.put(
  "/change-user-role-status",
  auth(UserRole.admin),
  changeUserRoleAndStatus
);

const userRouter = router;

export default userRouter;
