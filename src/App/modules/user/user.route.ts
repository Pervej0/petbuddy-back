import express from "express";
import { createUser, getAllUsers, updateUser } from "./user.controller";
import {
  UpdateUserValidationSchema,
  userValidationSchema,
} from "./user.zodValidation";
import validationChecker from "../../middleware/validationChecker";
import auth from "../../middleware/auth";
const router = express.Router();

router.get("/profile", auth(), getAllUsers);
router.post(
  "/register",
  auth(),
  validationChecker(userValidationSchema),
  createUser
);
router.put(
  "/profile",
  auth(),
  validationChecker(UpdateUserValidationSchema),
  updateUser
);

const userRouter = router;

export default userRouter;
