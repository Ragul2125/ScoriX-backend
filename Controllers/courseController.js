import CourseData from "../Models/courseData.model.js";
import Classroom from "../Models/Classroom.model.js";

export const createCourseData = async (req, res) => {
  try {
    const { courseName, classroomId } = req.body;
    const teacherId = req._id;
    
    // Verify classroom belongs to this teacher
    const classroom = await Classroom.findOne({ _id: classroomId, teacher: teacherId });
    if (!classroom) {
      return res.status(403).json({ message: "You are not authorized to upload for this classroom" });
    }

    // Map uploaded files
    const syllabusFiles = req.files["syllabusFiles"]?.map(
      (f) => `/uploads/courseData/${f.filename}`
    );
    const studyMaterials = req.files["studyMaterials"]?.map(
      (f) => `/uploads/courseData/${f.filename}`
    );
    const modelPapers = req.files["modelPapers"]?.map(
      (f) => `/uploads/courseData/${f.filename}`
    );

    const newCourseData = new CourseData({
      courseName,
      syllabusFiles,
      studyMaterials,
      modelPapers,
      teacher: teacherId,
      classroom: classroomId,
    });

    await newCourseData.save();
    res.status(201).json({ message: "Course data uploaded successfully", data: newCourseData });
  } catch (error) {
    console.error("Error uploading course data:", error);
    res.status(500).json({ message: "Error uploading course data", error });
  }
};
