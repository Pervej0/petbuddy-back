import express from "express";
import { loginUser } from "./auth.controller";
import validationChecker from "../../middleware/validationChecker";
import { loginUserSchema } from "./auth.zodValidation";
const router = express.Router();

router.post("/login", validationChecker(loginUserSchema), loginUser);

const authRouter = router;

export default authRouter;
