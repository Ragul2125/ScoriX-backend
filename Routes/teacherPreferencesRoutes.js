import express from "express";
import { createOrUpdatePreferences, getPreferences } from "../Controllers/teacherPreferences.Controller.js";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/preferences", protect, createOrUpdatePreferences); // create/update preferences
router.get("/preferences", protect, getPreferences);             // get own preferences

export default router;
