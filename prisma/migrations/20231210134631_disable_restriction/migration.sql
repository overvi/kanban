/*
  Warnings:

  - You are about to alter the column `dueDate` on the `task` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `board` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `column` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `dueDate` DATETIME NOT NULL;
