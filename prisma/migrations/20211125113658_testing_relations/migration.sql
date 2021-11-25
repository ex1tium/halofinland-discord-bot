/*
  Warnings:

  - The primary key for the `hi_service_record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `botUserUserId` on the `hi_service_record` table. All the data in the column will be lost.
  - You are about to drop the column `discordUserId` on the `hi_service_record` table. All the data in the column will be lost.
  - Added the required column `dataFromApi` to the `hi_service_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `hi_service_record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hi_service_record" DROP CONSTRAINT "hi_service_record_botUserUserId_fkey";

-- AlterTable
ALTER TABLE "hi_service_record" DROP CONSTRAINT "hi_service_record_pkey",
DROP COLUMN "botUserUserId",
DROP COLUMN "discordUserId",
ADD COLUMN     "dataFromApi" JSONB NOT NULL,
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "hi_service_record_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "HaloStats" (
    "id" INTEGER NOT NULL,
    "botUserUserId" INTEGER NOT NULL,
    "haloInfiniteServiceRecordId" INTEGER NOT NULL,
    "haloInfiniteCsrsId" INTEGER NOT NULL,

    CONSTRAINT "HaloStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hi_csrs" (
    "id" INTEGER NOT NULL,
    "dataFromApi" JSONB NOT NULL,

    CONSTRAINT "hi_csrs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HaloStats" ADD CONSTRAINT "HaloStats_haloInfiniteServiceRecordId_fkey" FOREIGN KEY ("haloInfiniteServiceRecordId") REFERENCES "hi_service_record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HaloStats" ADD CONSTRAINT "HaloStats_haloInfiniteCsrsId_fkey" FOREIGN KEY ("haloInfiniteCsrsId") REFERENCES "hi_csrs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HaloStats" ADD CONSTRAINT "HaloStats_botUserUserId_fkey" FOREIGN KEY ("botUserUserId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
