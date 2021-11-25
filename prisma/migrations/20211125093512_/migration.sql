/*
  Warnings:

  - Added the required column `lastUpdated` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "allowStatsLogging" BOOLEAN NOT NULL DEFAULT false;
