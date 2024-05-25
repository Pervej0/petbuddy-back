/*
  Warnings:

  - Changed the type of `adoptionDate` on the `adoptionRequests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "adoptionRequests" DROP COLUMN "adoptionDate",
ADD COLUMN     "adoptionDate" TIMESTAMP(3) NOT NULL;
