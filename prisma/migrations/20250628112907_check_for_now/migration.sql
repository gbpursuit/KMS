/*
  Warnings:

  - You are about to drop the column `overviewId` on the `professionaldevelopment` table. All the data in the column will be lost.
  - Added the required column `pdId` to the `Overview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `professionaldevelopment` DROP FOREIGN KEY `PD_overviewId_fkey`;

-- DropIndex
DROP INDEX `PD_overviewId_fkey` ON `professionaldevelopment`;

-- AlterTable
ALTER TABLE `overview` ADD COLUMN `pdId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `professionaldevelopment` DROP COLUMN `overviewId`;

-- AddForeignKey
ALTER TABLE `Overview` ADD CONSTRAINT `Overview_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `ProfessionalDevelopment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
