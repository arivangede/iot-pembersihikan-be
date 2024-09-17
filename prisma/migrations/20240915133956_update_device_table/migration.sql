/*
  Warnings:

  - Added the required column `connection_type` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "cellular_generation" TEXT,
ADD COLUMN     "connection_type" TEXT NOT NULL;
