/*
  Warnings:

  - You are about to drop the column `appendix` on the `professionaldevelopment` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `professionaldevelopment` table. All the data in the column will be lost.
  - You are about to drop the column `highlight` on the `professionaldevelopment` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `professionaldevelopment` table. All the data in the column will be lost.
  - You are about to drop the column `participant` on the `professionaldevelopment` table. All the data in the column will be lost.
  - You are about to drop the column `personnel` on the `professionaldevelopment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `professionaldevelopment` DROP COLUMN `appendix`,
    DROP COLUMN `evaluation`,
    DROP COLUMN `highlight`,
    DROP COLUMN `overview`,
    DROP COLUMN `participant`,
    DROP COLUMN `personnel`,
    ADD COLUMN `content` JSON NULL;
