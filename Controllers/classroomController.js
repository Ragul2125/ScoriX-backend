import Classroom from "../Models/Classroom.model.js";
import TeacherProfile from "../Models/teacherProfile.model.js";

// 🧠 Create a new classroom
export const createClassroom = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("req.body:", req.body);

    // Find teacherProfile of this logged-in user
    const teacherProfile = await TeacherProfile.findOne({ user: userId });
    if (!teacherProfile)
      return res.status(404).json({ message: "Teacher profile not found" });

    const {
      clsID,
      clsName,
      schoolOrCollegeName,
      department,
      sectionOrGrade,
      subject,
      nameList, // ✅ Accept as string
      academicYearOrTerm,
      evaluationPattern,
      feedbackStylePreference,
      strictnessLevel,
      aiMode,
    } = req.body;

    // ✅ Create classroom and store `nameList` as plain string
    const classroom = await Classroom.create({
      clsID,
      clsName,
      schoolOrCollegeName,
      department,
      sectionOrGrade,
      subject,
      nameList, // ✅ directly store the string here
      academicYearOrTerm,
      evaluationPattern,
      feedbackStylePreference,
      strictnessLevel,
      aiMode,
      teacherProfile: teacherProfile._id,
    });

    res.status(201).json({
      success: true,
      message: "Classroom created successfully",
      classroom,
    });
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getClassroomById = async (req, res) => {
  try {
    const userId = req.user._id;
    const teacherProfile = await TeacherProfile.findOne({ user: userId });

    if (!teacherProfile)
      return res.status(404).json({ message: "Teacher profile not found" });

    const classroom = await Classroom.findOne({
      _id: req.params.id,
      teacherProfile: teacherProfile._id, // Ensures teacher can only access their own classroom
    });

    if (!classroom)
      return res.status(404).json({ message: "Classroom not found" });

    res.json(classroom);
  } catch (error) {
    console.error("Error fetching classroom by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📚 Get all classrooms of the logged-in teacher
export const getMyClassrooms = async (req, res) => {
  try {
    const userId = req.user._id;
    const teacherProfile = await TeacherProfile.findOne({ user: userId });

    if (!teacherProfile)
      return res.status(404).json({ message: "Teacher profile not found" });

    const classrooms = await Classroom.find({
      teacherProfile: teacherProfile._id,
    });

    res.json(classrooms);
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Edit classroom
export const updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!classroom) return res.status(404).json({ message: "Not found" });
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete classroom
export const deleteClassroom = async (req, res) => {
  try {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ message: "Classroom deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
