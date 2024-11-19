import express from "express";
import competitionSelectionController from "../controllers/competitionselectionController.js";
import studentModel1 from "../controllers/studentmodel1.js";
import studentModel2 from "../controllers/studentmodel2.js";
import {
    createQuiz,
    getQuiz,
    getSchoolQuizzes,
    updateQuiz,
    deleteQuiz
  } from "../controllers/quizController.js";
  
import posterController from "../controllers/posterController.js";
import skitController from "../controllers/skitcontroller.js";
import teacherController from "../controllers/teachermodelController.js";

const router = express.Router();

router.post("/createCompetition", competitionSelectionController);
router.post("/student-model-1", studentModel1);
router.post("/student-model-2", studentModel2);

router.post('/quizzes/:id', createQuiz);
router.get('/quizzes/:id', getQuiz);
router.get('/schools/:schoolId/quizzes', getSchoolQuizzes);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

router.post("/poster", posterController);
router.post("/skit", skitController);
router.post("/teacher-model", teacherController);

export default router;
