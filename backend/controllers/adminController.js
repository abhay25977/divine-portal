import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Student from "../models/Student.js";

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ name, email, password });

    // Save the admin (password will be hashed before saving)
    await newAdmin.save();

    // Generate JWT or session
    const token = generateToken(newAdmin); // Assume generateToken is a function to generate JWT

    res.status(201).json({ token, newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, "secret", {
      expiresIn: "7d",
    });

    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user (student/teacher)
export const deleteUser = async (req, res) => {
  const { role, id } = req.params;

  try {
    if (role === "student") {
      await Student.findByIdAndDelete(id);
    } else if (role === "teacher") {
      await Teacher.findByIdAndDelete(id);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.status(200).json({ message: `${role} deleted` });
  } catch (err) {
    res.status(500).json({ message: "Deletion failed" });
  }
};