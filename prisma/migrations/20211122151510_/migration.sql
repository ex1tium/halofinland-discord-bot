/*
  Warnings:

  - You are about to drop the column `tweetsNewest_id` on the `tweet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_tweetsNewest_id_fkey";

-- AlterTable
ALTER TABLE "tweet" DROP COLUMN "tweetsNewest_id";
