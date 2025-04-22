import Student from "../models/Student.js";
import Counter from '../models/Counter.js'; // adjust the path
import jwt from 'jsonwebtoken';

// ========== Generate Student ID ==========
const generateStudentId = async ({ branch, district, academicYear, medium, grade }) => {
  const firstBranch = branch?.charAt(0).toUpperCase() || "X";
  const firstDistrict = district?.charAt(0).toUpperCase() || "X";
  const yearDigits = academicYear?.slice(-2) || "00";
  const firstMedium = medium?.charAt(0).toUpperCase() || "X";
  const classPart = grade?.toString().padStart(2, '0') || "00";

  const prefix = `${firstBranch}${firstDistrict}${yearDigits}${firstMedium}${classPart}`;

  // Update or create the counter for this prefix
  const counter = await Counter.findOneAndUpdate(
    { prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const serial = String(counter.seq).padStart(3, '0');
  const studentId = `${prefix}${serial}`;

  return studentId;
};


export const registerStudent = async (req, res) => {
  try {
    const {
      branch,
      district,
      firstName,
      middleName,
      lastName,
      dob,
      religion,
      gender,
      bloodGroup,
      medicalCondition,
      percentagePreviousClass,
      courseType,
      grade,
      academicYear,
      month,
      medium,
      schoolName,
      subjects,
      address,
      email,
      password,
      contact,
      fatherName,
      motherName,
      fatherContact,
      fatherOccupation,
      motherOccupation,
      guardianName,
      guardianRelation
    } = req.body;

    let profilePicture = req.body.profilePicture; // Already a URL from Cloudinary
    
    // if (profilePicture) {
    //   const uploadedResponse = await cloudinary.uploader.upload(profilePicture);
    //   profilePicture = uploadedResponse.secure_url;
    // }

    // Basic validation
    if (!email || !password || !firstName || !dob || !grade || !academicYear || !medium || !gender || !branch || !profilePicture) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const studentId = await generateStudentId({ branch, district, academicYear, medium, grade });

    if (!studentId) {
      return res.status(500).json({ message: "Failed to generate student ID" });
    }

    const newStudent = new Student({
      // Core Info
      branch,
      district,
      firstName,
      middleName,
      lastName,
      dob,
      religion,
      gender,
      bloodGroup,
      medicalCondition,
      percentagePreviousClass,
      courseType,

      // Academic Info
      grade,
      academicYear,
      month,
      medium,
      schoolName,
      subjects,
      totalSubjects: subjects?.length || 0,

      // Address
      address,

      // Auth & Contact
      email,
      password,
      contact,

      // Guardian
      fatherName,
      motherName,
      fatherContact,
      fatherOccupation,
      motherOccupation,
      guardianName,
      guardianRelation,
      studentId,
      profilePicture,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student Registered Successfully",
      studentId,
    });

  } catch (error) {
    console.error("Error in student registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student/Teacher not found" });
    }

    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      student: {
        id: student._id,
        name: `${student.firstName} ${student.lastName}`,
        studentId: student.studentId,
        email: student.email,
        profilePicture: student.profilePicture || '',
      },
      token,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
