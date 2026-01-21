import mongoose from "mongoose";

const teacherPreferencesSchema = new mongoose.Schema({
  teacherProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherProfile",
    required: true, // links to the teacher's profile
  },
  gradingStrictness: { type: String, default: "medium" },       // e.g., "strict", "medium", "lenient"
  partialCreditPreference: { type: Boolean, default: true },    // allow partial credit
  spellingTolerance: { type: Boolean, default: true },
  feedbackTone: { type: String, default: "neutral" },           // "positive", "neutral", "critical"
  markDistributionPreference: { type: String, default: "even" }, // e.g., "weighted", "even"
  questionTypePreference: [{ type: String }],                  // e.g., ["MCQ", "Short Answer"]
  gradingScale: { type: String, default: "percentage" },       // "percentage", "points"
  feedbackStyle: { type: String, default: "detailed" },        // "detailed", "brief"
  focusAreasPerQuestion: [{ type: String }],                   // e.g., ["concepts", "syntax"]
  examTypePreference: [{ type: String }],                      // e.g., ["midterm", "final", "quiz"]
  styleTemplates: [{ type: String }],                           // e.g., ["template1", "template2"]
}, {
  timestamps: true
});

export default mongoose.model("TeacherPreferences", teacherPreferencesSchema);
