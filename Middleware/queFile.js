import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/questionpapers/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadQuestionPaperFiles = multer({ storage }).fields([
  { name: "previousYearPapers", maxCount: 5 },
  { name: "exactFiles", maxCount: 10 },
]);
