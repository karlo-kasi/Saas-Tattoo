/*
  Warnings:

  - Made the column `updatedAt` on table `Studio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Studio`
MODIFY `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

