import express from "express";
import { changePassword, loginUser } from "./auth.controller";
import validationChecker from "../../middleware/validationChecker";
import { loginUserSchema } from "./auth.zodValidation";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";
const router = express.Router();

router.post("/login", validationChecker(loginUserSchema), loginUser);

router.post(
  "/change-password",
  auth(UserRole.admin, UserRole.user),
  changePassword
);
const authRouter = router;

export default authRouter;
