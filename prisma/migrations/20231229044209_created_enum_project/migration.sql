-- AlterTable
ALTER TABLE `project` ADD COLUMN `status` ENUM('ON_PROGRESS', 'MAINTENANCE', 'COMPLETED') NOT NULL DEFAULT 'ON_PROGRESS';
