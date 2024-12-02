/*
  Warnings:

  - Added the required column `cleaning_duration` to the `FishType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishType" ADD COLUMN     "cleaning_duration" INTEGER NOT NULL;
