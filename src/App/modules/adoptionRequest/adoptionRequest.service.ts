import { AdoptionRequest, PrismaClient } from "@prisma/client";
import { TJwtDecode } from "../../interface/global.type";
const prisma = new PrismaClient();

export const createAdoptionRequestDB = async (
  payload: any,
  user: TJwtDecode
) => {
  const getPet = await prisma.pet.findUniqueOrThrow({
    where: { id: payload.petId },
  });

  const getUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  payload.petName = getPet.name;
  payload.photo = getPet.photos[0];
  payload.adoptionDate = new Date(payload.adoptionDate);
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
  await prisma.adoptionRequest.findUniqueOrThrow({
    where: { id: requestId },
  });
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
