/*
  Warnings:

  - You are about to drop the column `device_name` on the `Device` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os_version` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "device_name",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "os_version" TEXT NOT NULL;
