-- DropForeignKey
ALTER TABLE `column` DROP FOREIGN KEY `Column_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `subtask` DROP FOREIGN KEY `SubTask_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_columnId_fkey`;
