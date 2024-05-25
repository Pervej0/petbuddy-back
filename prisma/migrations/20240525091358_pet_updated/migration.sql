/*
  Warnings:

  - Changed the type of `healthStatus` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('excellent', 'good', 'better', 'bad');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "healthStatus",
ADD COLUMN     "healthStatus" "HealthStatus" NOT NULL;
