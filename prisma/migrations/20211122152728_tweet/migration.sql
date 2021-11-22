/*
  Warnings:

  - Added the required column `author_id` to the `tweet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweet" ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
