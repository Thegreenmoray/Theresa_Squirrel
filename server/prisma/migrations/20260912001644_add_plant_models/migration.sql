/*
  Warnings:

  - Added the required column `Carelevel` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Environment` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lighting` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "Carelevel" TEXT NOT NULL,
ADD COLUMN     "Environment" TEXT NOT NULL,
ADD COLUMN     "Lighting" TEXT NOT NULL;
