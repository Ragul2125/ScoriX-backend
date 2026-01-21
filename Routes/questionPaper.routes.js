import express from "express";
import { questionPaperAgent } from "../Controllers/questionPaperAgent.controller.js";
import protect from "../Middleware/authMiddleware.js";
import { uploadQuestionPaperFiles } from "../Middleware/queFile.js";

const router = express.Router();

router.post("/agent", protect, uploadQuestionPaperFiles, questionPaperAgent);

export default router;
