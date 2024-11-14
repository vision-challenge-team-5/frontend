-- CreateTable
CREATE TABLE `ImageDetection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `x1` DECIMAL(65, 30) NOT NULL,
    `x2` DECIMAL(65, 30) NOT NULL,
    `y1` DECIMAL(65, 30) NOT NULL,
    `y2` DECIMAL(65, 30) NOT NULL,
    `confidence` DECIMAL(65, 30) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
