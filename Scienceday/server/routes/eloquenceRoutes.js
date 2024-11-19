import express from "express";
import {
  createEloquenceEnglish,
  createEloquenceGujarati,
  createEloquenceHindi,
} from "../controllers/eloquenceController.js";

const router = express.Router();

router.post("/english", createEloquenceEnglish);
router.post("/hindi", createEloquenceHindi);
router.post("/gujarati", createEloquenceGujarati);

export default router;
