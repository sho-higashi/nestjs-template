-- CreateTable
CREATE TABLE "AlarmItem" (
    "id" TEXT NOT NULL,
    "alarmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlarmItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlarmItem" ADD CONSTRAINT "AlarmItem_alarmId_fkey" FOREIGN KEY ("alarmId") REFERENCES "Alarm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
