/*
  Warnings:

  - You are about to drop the column `dueDate` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `dueDate`,
    DROP COLUMN `priority`;

-- CreateTable
CREATE TABLE `SubTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `completed` BOOLEAN NOT NULL,
    `taskId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubTask` ADD CONSTRAINT `SubTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
