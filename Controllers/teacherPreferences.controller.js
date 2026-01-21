import TeacherPreferences from "../Models/teacherPreferences.model.js";
import TeacherProfile from "../Models/teacherProfile.model.js";

// Create or update preferences
export const createOrUpdatePreferences = async (req, res) => {
  const userId = req.user._id;

  try {
    // Get teacher profile
    const profile = await TeacherProfile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Teacher profile not found" });

    const data = req.body;
    data.teacherProfile = profile._id;

    // Check if preferences already exist
    let preferences = await TeacherPreferences.findOne({ teacherProfile: profile._id });

    if (preferences) {
      // Update
      preferences = await TeacherPreferences.findOneAndUpdate(
        { teacherProfile: profile._id },
        data,
        { new: true }
      );
    } else {
      // Create
      preferences = await TeacherPreferences.create(data);
    }

    res.json(preferences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get preferences
export const getPreferences = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await TeacherProfile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Teacher profile not found" });

    const preferences = await TeacherPreferences.findOne({ teacherProfile: profile._id });
    if (!preferences) return res.status(404).json({ message: "Preferences not found" });

    res.json(preferences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
