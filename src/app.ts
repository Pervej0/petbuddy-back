import express from "express";
import { StatusCodes } from "http-status-codes";
const app = express();

app.get("/", (req, res) => {
  res.json({
    statusCode: StatusCodes.OK,
    message: "Welcome To PetBuddy Backend Site",
  });
});

export default app;
