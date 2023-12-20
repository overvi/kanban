/*
  Warnings:

  - You are about to drop the `taskorder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_id_fkey`;

-- DropForeignKey
ALTER TABLE `taskorder` DROP FOREIGN KEY `TaskOrder_order_fkey`;

-- DropTable
DROP TABLE `taskorder`;
