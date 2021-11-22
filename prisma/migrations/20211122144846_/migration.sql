/*
  Warnings:

  - The primary key for the `tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_tweetsNewest_id_fkey";

-- AlterTable
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tweetsNewest_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tweet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tweets" ALTER COLUMN "newest_id" SET DATA TYPE TEXT,
ALTER COLUMN "oldest_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_tweetsNewest_id_fkey" FOREIGN KEY ("tweetsNewest_id") REFERENCES "tweets"("newest_id") ON DELETE SET NULL ON UPDATE CASCADE;
