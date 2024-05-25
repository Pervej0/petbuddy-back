/*
  Warnings:

  - The values [Small,Medium,Large] on the enum `petSize` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `photo` on the `pets` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "petSize_new" AS ENUM ('small', 'medium', 'large');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "petSize_new" USING ("size"::text::"petSize_new");
ALTER TYPE "petSize" RENAME TO "petSize_old";
ALTER TYPE "petSize_new" RENAME TO "petSize";
DROP TYPE "petSize_old";
COMMIT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photo",
ADD COLUMN     "photos" TEXT[];
