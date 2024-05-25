/*
  Warnings:

  - Added the required column `adoptionDate` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petName` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptionRequests" ADD COLUMN     "adoptionDate" TEXT NOT NULL,
ADD COLUMN     "petName" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
