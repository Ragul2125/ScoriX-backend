import mongoose from "mongoose";

const CourseDataSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  syllabusFiles: [{ type: String }],
  studyMaterials: [{ type: String }],
  modelPapers: [{ type: String }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherProfile" },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CourseData", CourseDataSchema);
