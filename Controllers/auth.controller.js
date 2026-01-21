import User from "../Models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  const { name, email_id, institution_name, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email_id });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email_id,
      institution_name,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: { name, email_id, institution_name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email_id, password } = req.body;

  try {
    // Check user
    const user = await User.findOne({ email_id });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, user: { name: user.name, email_id: user.email_id, institution_name: user.institution_name ,teacher_id : user._id} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
