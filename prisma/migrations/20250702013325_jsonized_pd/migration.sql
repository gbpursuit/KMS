/*
  Warnings:

  - You are about to drop the `highlight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `overview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participantonpd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personnel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personnelonpd` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appendix` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highlight` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnel` to the `ProfessionalDevelopment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `highlight` DROP FOREIGN KEY `Highlight_pdId_fkey`;

-- DropForeignKey
ALTER TABLE `overview` DROP FOREIGN KEY `Overview_pdId_fkey`;

-- DropForeignKey
ALTER TABLE `participantonpd` DROP FOREIGN KEY `ParticipantOnPD_participantId_fkey`;

-- DropForeignKey
ALTER TABLE `participantonpd` DROP FOREIGN KEY `ParticipantOnPD_pdId_fkey`;

-- DropForeignKey
ALTER TABLE `personnelonpd` DROP FOREIGN KEY `PersonnelOnPD_pdId_fkey`;

-- DropForeignKey
ALTER TABLE `personnelonpd` DROP FOREIGN KEY `PersonnelOnPD_personnelId_fkey`;

-- AlterTable
ALTER TABLE `professionaldevelopment` ADD COLUMN `appendix` JSON NOT NULL,
    ADD COLUMN `evaluation` JSON NOT NULL,
    ADD COLUMN `highlight` JSON NOT NULL,
    ADD COLUMN `overview` JSON NOT NULL,
    ADD COLUMN `participant` JSON NOT NULL,
    ADD COLUMN `personnel` JSON NOT NULL;

-- DropTable
DROP TABLE `highlight`;

-- DropTable
DROP TABLE `overview`;

-- DropTable
DROP TABLE `participant`;

-- DropTable
DROP TABLE `participantonpd`;

-- DropTable
DROP TABLE `personnel`;

-- DropTable
DROP TABLE `personnelonpd`;
