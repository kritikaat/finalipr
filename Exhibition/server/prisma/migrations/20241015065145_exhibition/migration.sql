-- CreateTable
CREATE TABLE "IPRExhibitionForm" (
    "id" SERIAL NOT NULL,
    "hallDimension" TEXT NOT NULL,
    "isEnclosedHall" TEXT NOT NULL,
    "canBeDarkened" TEXT NOT NULL,
    "hasCooling" TEXT,
    "isGroundFloor" TEXT NOT NULL,
    "hasStorageSpace" TEXT,
    "powerOutlets" INTEGER NOT NULL,
    "numTables" INTEGER,
    "vrSpace" TEXT,
    "hasWifi" TEXT,
    "lectureHallArea" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "hasAVFacilities" TEXT,
    "distanceFromExhibition" TEXT,
    "accommodationProvided" TEXT,
    "localTransportation" TEXT,
    "secureParkingSpace" TEXT,
    "manpowerForLoading" TEXT,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonMobile" TEXT NOT NULL,
    "contactPersonEmail" TEXT NOT NULL,
    "venueLocation" TEXT NOT NULL,
    "teacherInvitation" INTEGER NOT NULL,
    "teacherRegistration" INTEGER NOT NULL,
    "providesWritingMaterials" TEXT,
    "providesRefreshments" TEXT,
    "quizForSchoolStudents" TEXT,
    "quizTeamSelection" TEXT,
    "quizArrangements" TEXT,
    "quizRefreshments" TEXT,

    CONSTRAINT "IPRExhibitionForm_pkey" PRIMARY KEY ("id")
);
