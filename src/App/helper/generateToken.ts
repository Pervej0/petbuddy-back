import { TJwtPayload } from "../interface/global.type";
import jwt from "jsonwebtoken";

const generateToken = async (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { algorithm: "RS256", expiresIn });
  return token;
};

export default generateToken;
