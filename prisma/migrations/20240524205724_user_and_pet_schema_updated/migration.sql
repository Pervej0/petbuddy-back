/*
  Warnings:

  - Added the required column `HealthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialNeeds` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('activate', 'deactivate');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "HealthStatus" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "specialNeeds" TEXT NOT NULL,
ALTER COLUMN "photo" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "status" "userStatus" NOT NULL;
