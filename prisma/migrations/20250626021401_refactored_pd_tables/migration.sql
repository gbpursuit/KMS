/*
  Warnings:

  - You are about to drop the column `firstName` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `personnel` table. All the data in the column will be lost.
  - Added the required column `item` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `participant` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `role`,
    DROP COLUMN `team`,
    ADD COLUMN `item` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `pd` MODIFY `overview` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `personnel` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `role`,
    DROP COLUMN `team`,
    ADD COLUMN `item` TEXT NOT NULL;
