/*
  Warnings:

  - You are about to drop the column `discordId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discordUserId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordUserId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_discordId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "discordId",
ADD COLUMN     "discordUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_discordUserId_key" ON "user"("discordUserId");
