/*
  Warnings:

  - You are about to drop the column `reportId` on the `Party` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userUuid,partyId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_reportId_fkey";

-- DropIndex
DROP INDEX "Party_reportId_key";

-- DropIndex
DROP INDEX "Report_partyId_key";

-- AlterTable
ALTER TABLE "Party" DROP COLUMN "reportId";

-- CreateIndex
CREATE UNIQUE INDEX "Report_userUuid_partyId_key" ON "Report"("userUuid", "partyId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
