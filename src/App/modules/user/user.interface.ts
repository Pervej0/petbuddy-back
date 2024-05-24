import { UserRole, userStatus } from "@prisma/client";

export type TUser = {
  name: string;
  email: string;
  password: string;
  status: userStatus;
  role: UserRole;
};
