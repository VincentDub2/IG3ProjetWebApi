/*
  Warnings:

  - You are about to drop the column `food_id` on the `Meal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,meal_type,createdAt]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Meal` DROP FOREIGN KEY `Meal_food_id_fkey`;

-- AlterTable
ALTER TABLE `Meal` DROP COLUMN `food_id`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `MealFood` (
    `_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `foodId` VARCHAR(191) NOT NULL,
    `mealId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MealFood_foodId_mealId_key`(`foodId`, `mealId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Meal_user_id_meal_type_createdAt_key` ON `Meal`(`user_id`, `meal_type`, `createdAt`);

-- AddForeignKey
ALTER TABLE `MealFood` ADD CONSTRAINT `MealFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealFood` ADD CONSTRAINT `MealFood_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
