/*
  Warnings:

  - The values [small,medium,large] on the enum `petSize` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "petSize_new" AS ENUM ('Small', 'Medium', 'Large');
ALTER TABLE "Pet" ALTER COLUMN "size" TYPE "petSize_new" USING ("size"::text::"petSize_new");
ALTER TYPE "petSize" RENAME TO "petSize_old";
ALTER TYPE "petSize_new" RENAME TO "petSize";
DROP TYPE "petSize_old";
COMMIT;
