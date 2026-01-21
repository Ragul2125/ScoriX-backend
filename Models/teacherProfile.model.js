import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true, // Link to the signed-up user
  },
  role: { type: String, default: "Teacher" },
  gradesTaught: [{ type: String }], // Example: ["6th", "7th"]
  schoolOrCollegeName: { type: String },
  department: { type: String },
  mobileNumber: { type: String },
  profilePictureUrl: { type: String },
  subjectsTaught: [{ type: String }], // Example: ["Math", "Physics"]
  yearsOfExperience: { type: Number },
  bio: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model("TeacherProfile", teacherProfileSchema);
