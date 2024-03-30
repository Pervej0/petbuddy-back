import express from "express";
import { createUser, getAllUsers } from "./user.controller";
import { userValidationSchema } from "../user.zodValidation";
import validationChecker from "../../middleware/validationChecker";
import auth from "../../middleware/auth";
const router = express.Router();

router.get("/profile", auth(), getAllUsers);
router.post("/register", validationChecker(userValidationSchema), createUser);

const userRouter = router;

export default userRouter;
