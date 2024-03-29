import { ZodError } from "zod";
import {
  TCustomSimplifiedError,
  TErrorDetails,
} from "../interface/global.type";

const handledZodError = (error: ZodError): TCustomSimplifiedError => {
  let zodMessage = "";
  const errorDetails: TErrorDetails = error.issues.map((issue) => {
    zodMessage += issue.message + " ";
    return {
      field: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: zodMessage || "Validation error occur!",
    errorDetails,
  };
};

export default handledZodError;
