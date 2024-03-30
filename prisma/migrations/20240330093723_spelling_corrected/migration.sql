/*
  Warnings:

  - The `status` column on the `AdoptionReques` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AdoptionRequesStatust" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "AdoptionReques" DROP COLUMN "status",
ADD COLUMN     "status" "AdoptionRequesStatust" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "AdoptionRequesStatus";
