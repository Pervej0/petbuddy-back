import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import handledZodError from "../errors/handledZodError";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.BAD_REQUEST;
  let success = false;
  let message = "Something Went Wrong";
  let errorDetails = err;

  if (err instanceof ZodError) {
    const customSimplifiedError = handledZodError(err);
    message = customSimplifiedError?.message;
    errorDetails = customSimplifiedError?.errorDetails;
  }

  res.status(statusCode).json({ success, message, errorDetails });

  next();
};

export default globalErrorHandler;
