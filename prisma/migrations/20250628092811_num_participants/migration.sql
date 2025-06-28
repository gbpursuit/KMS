/*
  Warnings:

  - Added the required column `numParticipants` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professionaldevelopment` ADD COLUMN `numParticipants` INTEGER NOT NULL;
