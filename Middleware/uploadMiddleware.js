import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads/classrooms folder if it doesn't exist
const dir = "./uploads/classrooms";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/classrooms/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".csv", ".xlsx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Only CSV or Excel files allowed"), false);
};

export const uploadNameList = multer({ storage, fileFilter });
