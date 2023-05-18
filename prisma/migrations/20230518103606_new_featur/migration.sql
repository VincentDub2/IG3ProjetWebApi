-- AlterTable
ALTER TABLE `Food` ADD COLUMN `sugar` DOUBLE NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `hashedPassword` VARCHAR(191) NULL;
