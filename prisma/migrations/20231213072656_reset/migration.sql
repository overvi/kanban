/*
  Warnings:

  - Made the column `createdAt` on table `column` required. This step will fail if there are existing NULL values in that column.
  - Made the column `boardId` on table `column` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `column` DROP FOREIGN KEY `Column_boardId_fkey`;

-- AlterTable
ALTER TABLE `column` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `boardId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Column` ADD CONSTRAINT `Column_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
