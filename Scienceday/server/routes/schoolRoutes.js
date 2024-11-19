import express from "express";
import {createSchool, getSchoolData, updateSchoolData} from "../controllers/schoolController.js";
import {
    createAccompanyingTeacher,
    getAccompanyingTeacher,
    getSchoolAccompanyingTeachers,
    updateAccompanyingTeacher
  } from "../controllers/teacherController.js";


const router = express.Router();

router.post("/school", createSchool);
router.get("/schools/:id", getSchoolData);
router.put("/schools/:id", updateSchoolData);

router.post('/accompanying-teacher', createAccompanyingTeacher);
router.get('/accompanying-teacher/:id', getAccompanyingTeacher);
router.get('/school/:schoolId/accompanying-teachers', getSchoolAccompanyingTeachers);
router.put('/accompanying-teacher/:id', updateAccompanyingTeacher);

export default router;
