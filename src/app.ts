import express from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./App/middleware/globalErrorHandler";
import notFound from "./App/middleware/notFound";
const app = express();

app.get("/", (req, res) => {
  res.json({
    statusCode: StatusCodes.OK,
    message: "Welcome To PetBuddy Backend Site",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
