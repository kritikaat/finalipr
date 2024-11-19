/*
  Warnings:

  - A unique constraint covering the columns `[registrationId]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "registrationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "School_registrationId_key" ON "School"("registrationId");

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "SchoolRegistration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
