import express from "express";
import { createUser } from "./user.controller";
import { userValidationSchema } from "../user.zodValidation";
import validationChecker from "../../middleware/validationChecker";
const router = express.Router();

router.post("/register", validationChecker(userValidationSchema), createUser);

const userRouter = router;

export default userRouter;
