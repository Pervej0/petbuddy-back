import express from "express";
import userRouter from "../modules/user/user.route";
const router = express.Router();

const allRoutes = [
  {
    route: userRouter,
  },
];

allRoutes.forEach((rt) => router.use("/api", rt.route));

const rootRoute = router;
export default rootRoute;
