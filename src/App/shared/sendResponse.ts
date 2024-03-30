import { Response } from "express";
import { TJsonData } from "../interface/global.type";

const sendResponse = <T>(res: Response, jsonData: TJsonData<T>) => {
  res.status(jsonData.statusCode).json({
    success: true,
    statusCode: jsonData.statusCode,
    message: jsonData.message || "something Went Wrong!",
    meta: jsonData?.meta,
    data: jsonData?.data,
  });
};

export default sendResponse;
