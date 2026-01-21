import TeacherProfile from "../Models/teacherProfile.model.js";

// Create or update teacher profile
export const createOrUpdateProfile = async (req, res) => {
  const userId = req.user._id;
  const {
    role,
    gradesTaught,
    schoolOrCollegeName,
    departmentOrSubject,
    mobileNumber,
    subjectsTaught,
    yearsOfExperience,
    bio
  } = req.body;

  try {
    let profile = await TeacherProfile.findOne({ user: userId });

    // File URL
    const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (profile) {
      profile = await TeacherProfile.findOneAndUpdate(
        { user: userId },
        {
          role,
          gradesTaught,
          schoolOrCollegeName,
          departmentOrSubject,
          mobileNumber,
          subjectsTaught,
          yearsOfExperience,
          bio,
          ...(profilePictureUrl && { profilePictureUrl })
        },
        { new: true }
      );
      return res.json(profile);
    }

    profile = await TeacherProfile.create({
      user: userId,
      role,
      gradesTaught,
      schoolOrCollegeName,
      departmentOrSubject,
      mobileNumber,
      subjectsTaught,
      yearsOfExperience,
      bio,
      profilePictureUrl
    });

    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get own profile
export const getProfile = async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({ user: req.user._id }).populate("user", "name email_id institution_name");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
