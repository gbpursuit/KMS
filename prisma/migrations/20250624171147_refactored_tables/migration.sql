-- CreateTable
CREATE TABLE `PD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NULL,
    `programId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `team` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParticipantOnPD` (
    `pdId` INTEGER NOT NULL,
    `participantId` INTEGER NOT NULL,

    PRIMARY KEY (`pdId`, `participantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personnel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `team` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonnelOnPD` (
    `pdId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`pdId`, `personnelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Highlight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `pdfURL` VARCHAR(191) NULL,
    `vidURL` VARCHAR(191) NULL,
    `pdId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PD` ADD CONSTRAINT `PD_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipantOnPD` ADD CONSTRAINT `ParticipantOnPD_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `PD`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipantOnPD` ADD CONSTRAINT `ParticipantOnPD_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonnelOnPD` ADD CONSTRAINT `PersonnelOnPD_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `PD`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonnelOnPD` ADD CONSTRAINT `PersonnelOnPD_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `Personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_pdId_fkey` FOREIGN KEY (`pdId`) REFERENCES `PD`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
