/*
  Warnings:

  - You are about to drop the column `date` on the `professionaldevelopment` table. All the data in the column will be lost.
  - Added the required column `dateStart` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professionaldevelopment` DROP COLUMN `date`,
    ADD COLUMN `dateEnd` VARCHAR(191) NULL,
    ADD COLUMN `dateStart` VARCHAR(191) NOT NULL;
