// routes.js
import express from "express";
import competitionSelectionController from "../controllers/competitionselectionController.js";
import {
  createEloquenceEnglish,
  createEloquenceGujarati,
  createEloquenceHindi,
} from "../controllers/eloquenceController.js";
import {
  createEssayEnglish,
  createEssayGujarati,
  createEssayHindi,
} from "../controllers/essayController.js";
import posterController from "../controllers/posterController.js";
import quizController from "../controllers/quizController.js";
import { createSchool, getSchoolData, updateSchoolData } from "../controllers/schoolController.js";
import skitController from "../controllers/skitcontroller.js";
import studentModel1 from "../controllers/studentmodel1.js";
import studentModel2 from "../controllers/studentmodel2.js";
import accompanyingTeacherController from "../controllers/teacherController.js";
import teacherController from "../controllers/teachermodelController.js";
const router = express.Router();

router.post("/school", createSchool);
router.get("/school", authMiddleware, getSchoolData);
router.put("/school", authMiddleware, updateSchoolData);
router.post("/accompanying-teacher", accompanyingTeacherController);
router.post("/createCompetition", competitionSelectionController);

// Student Model 1 Routes
router.post("/student-model-1", studentModel1);

// Student Model 2 Routes
router.post("/student-model-2", studentModel2);

// Quiz Routes
router.post("/quiz", quizController);

router.post("/essay/english", createEssayEnglish);
router.post("/essay/hindi", createEssayHindi);
router.post("/essay/gujarati", createEssayGujarati);

// Essay Routes
router.post("/eloquence/english", createEloquenceEnglish);
router.post("/eloquence/hindi", createEloquenceHindi);
router.post("/eloquence/gujarati", createEloquenceGujarati);

// Poster Routes
router.post("/poster", posterController);

// Skit Routes
router.post("/skit", skitController);

// Teacher Model Routes
router.post("/teacher-model", teacherController);

export default router;
