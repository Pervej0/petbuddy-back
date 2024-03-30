/*
  Warnings:

  - The `status` column on the `adoptionRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AdoptionRequesStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "adoptionRequests" DROP COLUMN "status",
ADD COLUMN     "status" "AdoptionRequesStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "AdoptionRequesStatust";
