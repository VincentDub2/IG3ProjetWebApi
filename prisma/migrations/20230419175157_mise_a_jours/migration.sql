-- CreateTable
CREATE TABLE `User` (
    `_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `name` VARCHAR(191) NULL,
    `salt` VARCHAR(191) NULL,
    `sessionToken` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `weight` INTEGER NULL,
    `size` INTEGER NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `age` INTEGER NULL,
    `gender` ENUM('male', 'female') NULL,
    `goalType` ENUM('lose_weight', 'gain_weight', 'maintain_weight') NULL,
    `activityLevel` ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active') NULL,
    `targetWeight` INTEGER NULL,
    `dailyCalories` INTEGER NULL,
    `dailyProtein` INTEGER NULL,
    `dailyFat` INTEGER NULL,
    `dailyCarbs` INTEGER NULL,
    `percentageProtein` INTEGER NOT NULL DEFAULT 40,
    `percentageFat` INTEGER NOT NULL DEFAULT 40,
    `percentageCarbs` INTEGER NOT NULL DEFAULT 20,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `calories` INTEGER NOT NULL,
    `protein` INTEGER NOT NULL,
    `fat` INTEGER NOT NULL,
    `carbs` INTEGER NOT NULL,
    `fiber` INTEGER NULL,
    `salt` INTEGER NULL,
    `servingSize` INTEGER NOT NULL DEFAULT 100,
    `vitamins` VARCHAR(191) NULL,
    `minerals` VARCHAR(191) NULL,
    `allergens` VARCHAR(191) NULL,
    `foodCategory` VARCHAR(191) NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavori` (
    `_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `food_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserFavori_user_id_food_id_key`(`user_id`, `food_id`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `meal_type` ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
    `food_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavori` ADD CONSTRAINT `UserFavori_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavori` ADD CONSTRAINT `UserFavori_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `Food`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
