import dotenv from "dotenv";
import path from "path";

dotenv.config();

// console.log({ path: path.join((process.cwd(), ".env")) });

export default {
  PORT: process.env.PORT,
};
