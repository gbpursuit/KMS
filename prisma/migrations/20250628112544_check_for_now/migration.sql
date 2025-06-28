/*
  Warnings:

  - You are about to drop the column `overview` on the `professionaldevelopment` table. All the data in the column will be lost.
  - Added the required column `overviewId` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professionaldevelopment` DROP COLUMN `overview`,
    ADD COLUMN `overviewId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Overview` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfessionalDevelopment` ADD CONSTRAINT `PD_overviewId_fkey` FOREIGN KEY (`overviewId`) REFERENCES `Overview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
