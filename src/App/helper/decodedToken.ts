import jwt, { Secret } from "jsonwebtoken";

const decodedToken = (token: string, secret: Secret) => {
  const decode = jwt.verify(token, secret);
  return decode;
};

export default decodedToken;
