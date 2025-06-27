/*
  Warnings:

  - You are about to drop the `pd` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `highlight` DROP FOREIGN KEY `Highlight_pdId_fkey`;

-- DropForeignKey
ALTER TABLE `participantonpd` DROP FOREIGN KEY `ParticipantOnPD_pdId_fkey`;

-- DropForeignKey
ALTER TABLE `pd` DROP FOREIGN KEY `PD_programId_fkey`;

-- DropForeignKey
ALTER TABLE `pd` DROP FOREIGN KEY `PD_trainingId_fkey`;

-- DropForeignKey
ALTER TABLE `personnelonpd` DROP FOREIGN KEY `PersonnelOnPD_pdId_fkey`;

-- AlterTable
ALTER TABLE `account` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `pd`;

-- CreateTable
CREATE TABLE `ProfessionalDevelopment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `overview` TEXT NOT NULL,
    `leader` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `trainingId` INTEGER NOT NULL,
    `programId` INTEGER NOT NULL,

    INDEX `PD_programId_fkey`(`programId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfessionalDevelopment` ADD CONSTRAINT `PD_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `Training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessionalDevelopment` ADD CONSTRAINT `PD_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipantOnPd` ADD CONSTRAINT `ParticipantOnPD_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `ProfessionalDevelopment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonnelOnPd` ADD CONSTRAINT `PersonnelOnPD_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `ProfessionalDevelopment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `ProfessionalDevelopment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
