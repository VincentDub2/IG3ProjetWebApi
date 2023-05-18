/*
  Warnings:

  - You are about to alter the column `calories` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `protein` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fat` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `carbs` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fiber` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `salt` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Food` ADD COLUMN `brandId` VARCHAR(191) NULL,
    MODIFY `calories` DOUBLE NOT NULL,
    MODIFY `protein` DOUBLE NOT NULL,
    MODIFY `fat` DOUBLE NOT NULL,
    MODIFY `carbs` DOUBLE NOT NULL,
    MODIFY `fiber` DOUBLE NULL,
    MODIFY `salt` DOUBLE NULL;

-- CreateTable
CREATE TABLE `Brand` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;
