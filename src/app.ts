import express from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./App/middleware/globalErrorHandler";
import notFound from "./App/middleware/notFound";
import rootRoute from "./App/routes";
const app = express();

app.get("/", (req, res) => {
  res.json({
    statusCode: StatusCodes.OK,
    message: "Welcome To PetBuddy Backend Site",
  });
});

// handling all api routes
app.use(rootRoute);
// handling globally occured errors
app.use(globalErrorHandler);
// Handling The not found Api
app.use(notFound);

export default app;
