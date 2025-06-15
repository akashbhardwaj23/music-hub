/*
  Warnings:

  - Added the required column `description` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "description" TEXT NOT NULL;
