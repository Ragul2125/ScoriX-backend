import express from "express"
import dotenv from "dotenv"
import path from "path";

import authRoutes from "./Routes/auth.router.js"
import protectedRoutes from "./Routes/protectedRoutes.js";
import teacherProfileRoutes from "./Routes/teacherProfileRoutes.js";
import teacherPreferencesRoutes from "./Routes/teacherPreferencesRoutes.js";
import classroomRoutes from "./Routes/classroom.routes.js";
import courseRoutes from "./Routes/courseRoutes.js";
import questionPaperRoutes from "./Routes/questionPaper.routes.js";
import TeacherProfile from "./Models/teacherProfile.model.js";
import Teacher from "./Models/auth.model.js"
import cors from "cors";
import teacherPreferencesModel from "./Models/teacherPreferences.model.js";

dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", teacherProfileRoutes)
app.use("/api/teacher", teacherPreferencesRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/questionpaper", questionPaperRoutes);
app.get("/api/teacherprofile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // 1) Find teacher (exclude password)
    const teacher = await Teacher.findById(userId).select("-password");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher (user) not found" });
    }

    // 2) Find teacher profile (linked by user ref)
    const profile = await TeacherProfile.findOne({ user: userId }).lean();
    console.log(profile._id)
    if (!profile) {
      // still return teacher but indicate missing profile
      return res.status(404).json({
        message: "Teacher profile not found",
        teacher,
      });
    }

    // 3) Find preferences
    // Common case: preferences reference teacherProfile by ObjectId
    // Defensive: also try to find by a 'user' field if someone stored that way.
    let preferences = await teacherPreferencesModel.findOne({ teacherProfile: profile._id }).lean();

    if (!preferences) {
      // try fallback: some implementations store a direct user ref
      preferences = await teacherPreferencesModel.findOne({ user: userId }).lean();
    }

    // Build single JSON response (strip any sensitive fields if needed)
    const response = {
      teacher,          // basic teacher (no password)
      profile,          // teacher profile document
      preferences: preferences || null, // preferences or null if not found
    };

    return res.json(response);
  } catch (err) {
    console.error("Error fetching teacher data:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default app;