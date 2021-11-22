/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_tweetsNewest_id_fkey";

-- DropTable
DROP TABLE "Tweet";

-- CreateTable
CREATE TABLE "tweet" (
    "id" INTEGER NOT NULL,
    "tweetsNewest_id" INTEGER,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_tweetsNewest_id_fkey" FOREIGN KEY ("tweetsNewest_id") REFERENCES "tweets"("newest_id") ON DELETE SET NULL ON UPDATE CASCADE;
