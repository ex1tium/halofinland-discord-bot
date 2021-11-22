/*
  Warnings:

  - Added the required column `text` to the `tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweet" ADD COLUMN     "text" TEXT NOT NULL;
