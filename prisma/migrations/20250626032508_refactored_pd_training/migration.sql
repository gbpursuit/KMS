/*
  Warnings:

  - Added the required column `trainingId` to the `PD` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pd` ADD COLUMN `trainingId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PD` ADD CONSTRAINT `PD_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `Training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
