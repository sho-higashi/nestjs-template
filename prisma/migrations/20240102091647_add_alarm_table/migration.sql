-- CreateEnum
CREATE TYPE "AlarmSeverity" AS ENUM ('critical', 'high', 'medium', 'low');

-- CreateTable
CREATE TABLE "Alarm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "severity" "AlarmSeverity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);
