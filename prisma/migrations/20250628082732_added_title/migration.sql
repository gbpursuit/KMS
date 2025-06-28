/*
  Warnings:

  - Added the required column `title` to the `CurriculumDevelopment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Extension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Research` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `curriculumdevelopment` ADD COLUMN `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `extension` ADD COLUMN `title` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `research` ADD COLUMN `title` TEXT NOT NULL;
