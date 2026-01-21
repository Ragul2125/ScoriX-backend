import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/courseData/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Expect multiple fields with multiple files each
const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "syllabusFiles", maxCount: 5 },
  { name: "studyMaterials", maxCount: 10 },
  { name: "modelPapers", maxCount: 5 },
]);

export default upload;
