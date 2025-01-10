/*
  Warnings:

  - You are about to drop the column `request_time` on the `PerformanceLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerformanceLog" DROP COLUMN "request_time";
