/*
  Warnings:

  - Made the column `triggeredAt` on table `Alarm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Alarm" ALTER COLUMN "triggeredAt" SET NOT NULL;
