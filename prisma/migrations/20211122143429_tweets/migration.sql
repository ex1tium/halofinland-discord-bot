/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "tweets" (
    "newest_id" INTEGER NOT NULL,
    "oldest_id" INTEGER NOT NULL,
    "ratelimit_reset" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" INTEGER NOT NULL,
    "tweetsNewest_id" INTEGER,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_discordId_key" ON "user"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "tweets_newest_id_key" ON "tweets"("newest_id");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_tweetsNewest_id_fkey" FOREIGN KEY ("tweetsNewest_id") REFERENCES "tweets"("newest_id") ON DELETE SET NULL ON UPDATE CASCADE;
