import express from "express";
import { createOrUpdateProfile, getProfile } from "../Controllers/teacherProfile.Controller.js";
import protect from "../Middleware/authMiddleware.js";
import upload from "../Middleware/upload.js";

const router = express.Router();

// Protected routes
router.post("/profile", protect, upload.single("profilePicture"), createOrUpdateProfile); // create/update profile
router.get("/profile", protect, getProfile);             // get own profile

export default router;
