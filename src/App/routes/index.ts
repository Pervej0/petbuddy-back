import express from "express";
import userRouter from "../modules/user/user.route";
import authRouter from "../modules/auth/auth.route";
import petRouter from "../modules/pet/pet.router";
import AdoptionRequestRouter from "../modules/adoptionRequest/adoptionRequest.router";
const router = express.Router();

const allRoutes = [
  {
    route: userRouter,
  },
  {
    route: petRouter,
  },
  {
    route: AdoptionRequestRouter,
  },
  {
    route: authRouter,
  },
];

allRoutes.forEach((rt) => router.use("/api", rt.route));

const rootRoute = router;
export default rootRoute;
