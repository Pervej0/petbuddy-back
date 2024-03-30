import { AdoptionRequest, PrismaClient } from "@prisma/client";
import { TJwtDecode } from "../../interface/global.type";
const prisma = new PrismaClient();

export const createAdoptionRequestDB = async (
  payload: any,
  user: TJwtDecode
) => {
  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  payload.userId = getUser.id;

  const adoptionRequest = await prisma.adoptionRequest.create({
    data: payload,
  });

  return adoptionRequest;
};

export const updateAdoptionRequestDB = async (
  requestId: string,
  payload: Partial<AdoptionRequest>
) => {
  const update = await prisma.adoptionRequest.update({
    where: { id: requestId },
    data: payload,
  });
  return update;
};

export const getAllAdoptionRequestsDB = async () => {
  const requests = await prisma.adoptionRequest.findMany({});
  return requests;
};
