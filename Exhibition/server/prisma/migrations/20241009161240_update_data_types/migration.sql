-- AlterTable
ALTER TABLE "IPRExhibitionForm" ALTER COLUMN "hasCooling" DROP NOT NULL,
ALTER COLUMN "hasStorageSpace" DROP NOT NULL,
ALTER COLUMN "numTables" DROP NOT NULL,
ALTER COLUMN "vrSpace" DROP NOT NULL,
ALTER COLUMN "hasWifi" DROP NOT NULL,
ALTER COLUMN "hasAVFacilities" DROP NOT NULL,
ALTER COLUMN "distanceFromExhibition" DROP NOT NULL,
ALTER COLUMN "accommodationProvided" DROP NOT NULL,
ALTER COLUMN "localTransportation" DROP NOT NULL,
ALTER COLUMN "secureParkingSpace" DROP NOT NULL,
ALTER COLUMN "manpowerForLoading" DROP NOT NULL,
ALTER COLUMN "providesWritingMaterials" DROP NOT NULL,
ALTER COLUMN "providesRefreshments" DROP NOT NULL,
ALTER COLUMN "quizForSchoolStudents" DROP NOT NULL,
ALTER COLUMN "quizTeamSelection" DROP NOT NULL,
ALTER COLUMN "quizArrangements" DROP NOT NULL,
ALTER COLUMN "quizRefreshments" DROP NOT NULL;
