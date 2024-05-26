/*
  Warnings:

  - You are about to drop the column `petName` on the `adoptionRequests` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `adoptionRequests` table. All the data in the column will be lost.
  - Added the required column `email` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAndConditions` to the `adoptionRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoptionRequests" DROP COLUMN "petName",
DROP COLUMN "photo",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "termsAndConditions" BOOLEAN NOT NULL;
