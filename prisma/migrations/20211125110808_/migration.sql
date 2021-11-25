-- CreateTable
CREATE TABLE "hi_service_record" (
    "discordUserId" TEXT NOT NULL,
    "botUserUserId" INTEGER NOT NULL,

    CONSTRAINT "hi_service_record_pkey" PRIMARY KEY ("discordUserId")
);

-- AddForeignKey
ALTER TABLE "hi_service_record" ADD CONSTRAINT "hi_service_record_botUserUserId_fkey" FOREIGN KEY ("botUserUserId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
