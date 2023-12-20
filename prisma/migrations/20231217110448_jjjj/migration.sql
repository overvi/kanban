/*
  Warnings:

  - You are about to drop the column `order` on the `task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Task_order_key` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `order`;

-- CreateTable
CREATE TABLE `TaskOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NOT NULL,

    UNIQUE INDEX `TaskOrder_order_key`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_id_fkey` FOREIGN KEY (`id`) REFERENCES `TaskOrder`(`order`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskOrder` ADD CONSTRAINT `TaskOrder_order_fkey` FOREIGN KEY (`order`) REFERENCES `Column`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
