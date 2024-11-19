/*
  Warnings:

  - You are about to drop the `ipr_exhibition_forms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ipr_exhibition_forms";

-- CreateTable
CREATE TABLE "IPRExhibitionForm" (
    "id" SERIAL NOT NULL,
    "hallDimension" TEXT NOT NULL,
    "isEnclosedHall" TEXT NOT NULL,
    "canBeDarkened" TEXT NOT NULL,
    "hasCooling" TEXT NOT NULL,
    "isGroundFloor" TEXT NOT NULL,
    "hasStorageSpace" TEXT NOT NULL,
    "powerOutlets" INTEGER NOT NULL,
    "numTables" INTEGER NOT NULL,
    "vrSpace" TEXT NOT NULL,
    "hasWifi" TEXT NOT NULL,
    "lectureHallArea" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "hasAVFacilities" TEXT NOT NULL,
    "distanceFromExhibition" TEXT NOT NULL,
    "accommodationProvided" TEXT NOT NULL,
    "localTransportation" TEXT NOT NULL,
    "secureParkingSpace" TEXT NOT NULL,
    "manpowerForLoading" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonMobile" TEXT NOT NULL,
    "contactPersonEmail" TEXT NOT NULL,
    "venueLocation" TEXT NOT NULL,
    "teacherInvitation" INTEGER NOT NULL,
    "teacherRegistration" INTEGER NOT NULL,
    "providesWritingMaterials" TEXT NOT NULL,
    "providesRefreshments" TEXT NOT NULL,
    "quizForSchoolStudents" TEXT NOT NULL,
    "quizTeamSelection" TEXT NOT NULL,
    "quizArrangements" TEXT NOT NULL,
    "quizRefreshments" TEXT NOT NULL,

    CONSTRAINT "IPRExhibitionForm_pkey" PRIMARY KEY ("id")
);
