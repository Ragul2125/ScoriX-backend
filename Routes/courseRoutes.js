import express from "express";
import upload from "../Middleware/uploadCourseFiles.js";
import { createCourseData } from "../Controllers/courseController.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload, createCourseData);

export default router;
