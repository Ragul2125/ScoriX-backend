import express from "express";
import protect from "../Middleware/authMiddleware.js";

const router = express.Router();

// Example protected route
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}! This is a protected route.`,
  });
});

export default router;
