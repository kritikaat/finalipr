/*
  Warnings:

  - You are about to drop the `AccompanyingTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Competition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EloquenceEnglish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EloquenceGujarati` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EloquenceHindi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EssayEnglish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EssayGujarati` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EssayHindi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Poster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolRegistration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentModel1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentModel2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccompanyingTeacher" DROP CONSTRAINT "AccompanyingTeacher_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "EloquenceEnglish" DROP CONSTRAINT "EloquenceEnglish_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "EloquenceGujarati" DROP CONSTRAINT "EloquenceGujarati_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "EloquenceHindi" DROP CONSTRAINT "EloquenceHindi_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "EssayEnglish" DROP CONSTRAINT "EssayEnglish_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "EssayGujarati" DROP CONSTRAINT "EssayGujarati_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "EssayHindi" DROP CONSTRAINT "EssayHindi_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Poster" DROP CONSTRAINT "Poster_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Skit" DROP CONSTRAINT "Skit_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "StudentModel1" DROP CONSTRAINT "StudentModel1_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "StudentModel2" DROP CONSTRAINT "StudentModel2_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherModel" DROP CONSTRAINT "TeacherModel_schoolId_fkey";

-- DropTable
DROP TABLE "AccompanyingTeacher";

-- DropTable
DROP TABLE "Competition";

-- DropTable
DROP TABLE "EloquenceEnglish";

-- DropTable
DROP TABLE "EloquenceGujarati";

-- DropTable
DROP TABLE "EloquenceHindi";

-- DropTable
DROP TABLE "EssayEnglish";

-- DropTable
DROP TABLE "EssayGujarati";

-- DropTable
DROP TABLE "EssayHindi";

-- DropTable
DROP TABLE "Poster";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "School";

-- DropTable
DROP TABLE "SchoolRegistration";

-- DropTable
DROP TABLE "Skit";

-- DropTable
DROP TABLE "StudentModel1";

-- DropTable
DROP TABLE "StudentModel2";

-- DropTable
DROP TABLE "TeacherModel";

-- CreateTable
CREATE TABLE "SchoolAllInOne" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "affiliationNumber" TEXT NOT NULL,
    "coordinatorTeacherName" TEXT NOT NULL,
    "coordinatorTeacherMobile" TEXT NOT NULL,
    "accompanyingTeacherName" TEXT,
    "accompanyingTeacherGender" TEXT,
    "accompanyingTeacherAccommodation" BOOLEAN NOT NULL,
    "teacherName" TEXT,
    "teacherGender" TEXT,
    "accommodationRequired" TEXT,
    "additionalRequirements" TEXT,
    "declaration" TEXT,
    "writeup" TEXT,
    "competitionTitle" TEXT,
    "participant1Name" TEXT,
    "participant1Gender" TEXT,
    "participant1Class" TEXT,
    "participant1Accommodation" TEXT,
    "participant2Name" TEXT,
    "participant2Gender" TEXT,
    "participant2Class" TEXT,
    "participant2Accommodation" TEXT,
    "studentAdditionalRequirements" TEXT,
    "studentDeclaration" TEXT,
    "studentWriteup" TEXT,
    "participant1Name2" TEXT,
    "participant1Gender2" TEXT,
    "participant1Class2" TEXT,
    "participant1Accommodation2" TEXT,
    "participant2Name2" TEXT,
    "participant2Gender2" TEXT,
    "participant2Class2" TEXT,
    "participant2Accommodation2" TEXT,
    "studentAdditionalRequirements2" TEXT,
    "studentDeclaration2" TEXT,
    "studentWriteup2" TEXT,
    "eloquenceEnglishName" TEXT,
    "eloquenceEnglishGender" TEXT,
    "eloquenceEnglishClass" TEXT,
    "eloquenceEnglishAccommodation" TEXT,
    "eloquenceEnglishDeclaration" TEXT,
    "eloquenceHindiName" TEXT,
    "eloquenceHindiGender" TEXT,
    "eloquenceHindiClass" TEXT,
    "eloquenceHindiAccommodation" TEXT,
    "eloquenceHindiDeclaration" TEXT,
    "eloquenceGujaratiName" TEXT,
    "eloquenceGujaratiGender" TEXT,
    "eloquenceGujaratiClass" TEXT,
    "eloquenceGujaratiAccommodation" TEXT,
    "eloquenceGujaratiDeclaration" TEXT,
    "essayEnglishName" TEXT,
    "essayEnglishGender" TEXT,
    "essayEnglishClass" TEXT,
    "essayEnglishAccommodation" TEXT,
    "essayEnglishFileUrl" TEXT,
    "essayEnglishDeclaration" TEXT,
    "essayHindiName" TEXT,
    "essayHindiGender" TEXT,
    "essayHindiClass" TEXT,
    "essayHindiAccommodation" TEXT,
    "essayHindiFileUrl" TEXT,
    "essayHindiDeclaration" TEXT,
    "essayGujaratiName" TEXT,
    "essayGujaratiGender" TEXT,
    "essayGujaratiClass" TEXT,
    "essayGujaratiAccommodation" TEXT,
    "essayGujaratiFileUrl" TEXT,
    "essayGujaratiDeclaration" TEXT,
    "posterParticipant1Name" TEXT,
    "posterParticipant1Gender" TEXT,
    "posterParticipant1Class" TEXT,
    "posterParticipant1Accommodation" TEXT,
    "posterParticipant1Declaration" TEXT,
    "posterParticipant2Name" TEXT,
    "posterParticipant2Gender" TEXT,
    "posterParticipant2Class" TEXT,
    "posterParticipant2Accommodation" TEXT,
    "posterParticipant2Declaration" TEXT,
    "skitParticipant1Name" TEXT,
    "skitParticipant1Gender" TEXT,
    "skitParticipant1Class" TEXT,
    "skitParticipant1Accommodation" TEXT,
    "skitParticipant2Name" TEXT,
    "skitParticipant2Gender" TEXT,
    "skitParticipant2Class" TEXT,
    "skitParticipant2Accommodation" TEXT,
    "skitParticipant3Name" TEXT,
    "skitParticipant3Gender" TEXT,
    "skitParticipant3Class" TEXT,
    "skitParticipant3Accommodation" TEXT,
    "skitParticipant4Name" TEXT,
    "skitParticipant4Gender" TEXT,
    "skitParticipant4Class" TEXT,
    "skitParticipant4Accommodation" TEXT,
    "skitParticipant5Name" TEXT,
    "skitParticipant5Gender" TEXT,
    "skitParticipant5Class" TEXT,
    "skitParticipant5Accommodation" TEXT,
    "skitParticipant6Name" TEXT,
    "skitParticipant6Gender" TEXT,
    "skitParticipant6Class" TEXT,
    "skitParticipant6Accommodation" TEXT,
    "skitAdditionalRequirements" TEXT,
    "skitDeclaration" TEXT,
    "skitVideoLink" TEXT,
    "quizParticipant1Name" TEXT,
    "quizParticipant1Gender" TEXT,
    "quizParticipant1Class" TEXT,
    "quizParticipant1Accommodation" TEXT,
    "quizParticipant2Name" TEXT,
    "quizParticipant2Gender" TEXT,
    "quizParticipant2Class" TEXT,
    "quizParticipant2Accommodation" TEXT,
    "quizDeclaration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolAllInOne_pkey" PRIMARY KEY ("id")
);
