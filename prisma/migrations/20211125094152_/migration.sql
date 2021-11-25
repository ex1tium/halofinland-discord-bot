/*
  Warnings:

  - The `allowStatsLogging` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "allowStatsLogging",
ADD COLUMN     "allowStatsLogging" INTEGER NOT NULL DEFAULT 0;
