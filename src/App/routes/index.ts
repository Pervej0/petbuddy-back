import express from "express";
import userRouter from "../modules/user/user.route";
import authRouter from "../modules/auth/auth.route";
const router = express.Router();

const allRoutes = [
  {
    route: userRouter,
  },
  {
    route: authRouter,
  },
];

allRoutes.forEach((rt) => router.use("/api", rt.route));

const rootRoute = router;
export default rootRoute;
