import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.BAD_REQUEST;
  let success = false;
  let message = err.message || "Something Went Wrong";
  let errorDetails = err;

  // if (err instanceof ZodError) {
  //   message = err?.message;
  //   errorDetails = err;
  // }

  res.status(statusCode).json({ success, message, errorDetails });

  next();
};

export default globalErrorHandler;
