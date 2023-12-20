-- DropForeignKey
ALTER TABLE `column` DROP FOREIGN KEY `Column_boardId_fkey`;

-- AlterTable
ALTER TABLE `column` MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `boardId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Column` ADD CONSTRAINT `Column_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `Board`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
