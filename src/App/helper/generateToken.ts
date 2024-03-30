import { TJwtPayload } from "../interface/global.type";
import jwt from "jsonwebtoken";

const generateToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};

export default generateToken;
