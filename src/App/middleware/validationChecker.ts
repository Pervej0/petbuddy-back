import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationChecker = (validatingData: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validatingData.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationChecker;
