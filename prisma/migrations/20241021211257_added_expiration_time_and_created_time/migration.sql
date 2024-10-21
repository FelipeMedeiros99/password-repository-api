/*
  Warnings:

  - Added the required column `expiration` to the `token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "token" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;
