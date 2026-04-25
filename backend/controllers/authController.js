import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN REQUEST:", req.body);

    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check password safely
    if (!user.password) {
      return res.status(500).json({ message: "User password missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success response
    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
      isAdmin: user.isAdmin
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
