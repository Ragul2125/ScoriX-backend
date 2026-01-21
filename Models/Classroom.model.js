import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema(
  {
    clsID: { type: String, required: true },
    clsName: { type: String, required: true },
    schoolOrCollegeName: { type: String, required: true },
    department: { type: String, required: true },
    sectionOrGrade: { type: String, required: true },
    subject: { type: String, required: true },
    academicYearOrTerm: { type: String, required: true },
    evaluationPattern: { type: String },
    feedbackStylePreference: { type: String },
    strictnessLevel: { type: String },
    aiMode: { type: String },
    nameListFile: { type: String },
    teacherProfile: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherProfile", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Classroom", ClassroomSchema);
