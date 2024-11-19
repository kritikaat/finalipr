import express from "express";
import {
  createEssayEnglish,
  createEssayGujarati,
  createEssayHindi,
} from "../controllers/essayController.js";

const router = express.Router();

router.post("/english", createEssayEnglish);
router.post("/hindi", createEssayHindi);
router.post("/gujarati", createEssayGujarati);

export default router;
