import express from "express";
import {
  createClassroom,
  getMyClassrooms,
  updateClassroom,
  deleteClassroom,
  getClassroomById
} from "../Controllers/classroom.controller.js";
import protect from "../Middleware/authMiddleware.js";
import { uploadNameList } from "../Middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, createClassroom);
router.get("/", protect, getMyClassrooms);
router.get("/:id", protect, getClassroomById); 
router.put("/:id", protect, uploadNameList.single("nameListFile"), updateClassroom);
router.delete("/:id", protect, deleteClassroom);

router.put("/:classId/updateMarks", async (req, res) => {
  try {
    const { classId } = req.params;
    const { totalMarks } = req.body; // [{ rollno, totalMark }]

    const classroom = await Classroom.findById(classId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // 1️⃣ Map marks by rollno for quick lookup
    const markMap = new Map(totalMarks.map(m => [m.rollno, m.totalMark]));

    // 2️⃣ Update avg_score if rollno matches
    classroom.nameList = classroom.nameList.map(student => ({
      ...student,
      avg_score: markMap.get(student.rollno) || student.avg_score,
    }));

    // 3️⃣ Save updates
    await classroom.save();

    res.status(200).json({ message: "Marks updated successfully", classroom });
  } catch (err) {
    console.error("❌ Error updating marks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;
