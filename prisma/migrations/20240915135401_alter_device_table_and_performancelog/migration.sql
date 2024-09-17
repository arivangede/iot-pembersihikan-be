/*
  Warnings:

  - You are about to drop the column `cellular_generation` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `connection_type` on the `Device` table. All the data in the column will be lost.
  - Added the required column `connection_type` to the `PerformanceLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "cellular_generation",
DROP COLUMN "connection_type";

-- AlterTable
ALTER TABLE "PerformanceLog" ADD COLUMN     "cellular_generation" TEXT,
ADD COLUMN     "connection_type" TEXT NOT NULL;
