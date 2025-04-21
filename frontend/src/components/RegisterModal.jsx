import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    branch: "",
    gender: "",
    religion: "",
    bloodGroup: "",
    medicalCondition: "",
    percentagePreviousClass: "",
    courseType: "",
    grade: "",
    academicYear: "",
    month: "",
    medium: "",
    schoolName: "",
    subjects: "",
    totalSubjects: "",
    address: "",
    email: "",
    password: "",
    contact: "",
    fatherName: "",
    motherName: "",
    fatherContact: "",
    fatherOccupation: "",
    motherOccupation: "",
    guardianName: "",
    guardianRelation: "",
    studentId: "",
    profilePicture: "",
  });

  const [message, setMessage] = useState("");
  const [currentSection, setCurrentSection] = useState(1); // 1 for student details, 2 for parent details
  const [canProceed, setCanProceed] = useState(false); // To control the visibility of the Next button
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "subjects" ? value.split(",") : value, // Handle subjects as array
    }));
  };

  // const handleProfilePictureUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "divine-academy");

  //   try {
  //     const res = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", data);
  //     setFormData((prev) => ({ ...prev, profilePicture: res.data.secure_url }));
  //   } catch (err) {
  //     console.error("Profile picture upload failed", err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEndpoint = `http://localhost:4010/api/${formData.userType.toLowerCase()}/register`;
      const res = await axios.post(apiEndpoint, formData);
      setMessage(res.data.message);

      setFormData({
        userType: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        branch: "",
        gender: "",
        religion: "",
        bloodGroup: "",
        medicalCondition: "",
        percentagePreviousClass: "",
        courseType: "",
        grade: "",
        academicYear: "",
        month: "",
        medium: "",
        schoolName: "",
        subjects: "",
        totalSubjects: "",
        address: "",
        email: "",
        password: "",
        contact: "",
        fatherName: "",
        motherName: "",
        fatherOccupation: "",
        motherOccupation: "",
        guardianName: "",
        guardianRelation: "",
        studentId: "",
        profilePicture: "",
      });

      setTimeout(() => {
        onClose();
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  // Function to check if all required fields in the student section are filled
  const validateStudentDetails = () => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
      formData.contact,
      formData.dob,
      formData.branch,
      formData.religion,
      formData.courseType,
      formData.grade,
      formData.academicYear,
      formData.month,
      formData.medium,
      formData.schoolName,
      formData.subjects,
      formData.fatherName,
      formData.fatherContact,
      formData.fatherOccupation,
      formData.motherName,
      formData.motherOccupation,
      formData.guardianName,
      formData.guardianRelation,
    ];

    // If all required fields are filled, enable the Next button
    setCanProceed(requiredFields.every((field) => field !== ""));
  };

  useEffect(() => {
    // Revalidate whenever formData changes
    if (currentSection === 1) {
      validateStudentDetails();
    }
  }, [formData, currentSection]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-4 py-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-lg sm:max-w-3xl p-4 sm:p-6 rounded-xl shadow-xl relative overflow-y-auto max-h-[90vh]"
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-20%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-2xl font-bold text-red-600 hover:text-red-800"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center text-red-700 dark:text-yellow-400 mb-6">
              User Registration Form
            </h2>

            {message && (
              <div className="bg-yellow-100 dark:bg-yellow-800 dark:text-white border border-yellow-400 px-4 py-2 rounded mb-4 text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* SECTION 1: STUDENT DETAILS */}
              {currentSection === 1 && (
                <div>
                  <div className="mb-4">
                    <label className="block mb-1">User Type</label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="">Select User Type</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-style"
                    />
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="input-style"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-style"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-style"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="input-style"
                    />
                    <div className="flex items-center gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                      >
                        <option value="+91">India (+91)</option>
                        <option value="+977">Nepal (+977)</option>
                        <option value="+1">USA (+1)</option>
                        <option value="+44">UK (+44)</option>
                      </select>
                      <input
                        type="text"
                        name="contact"
                        placeholder="Enter phone number"
                        required
                        value={formData.contact}
                        onChange={handleChange}
                        className="input-style"
                      />
                    </div>


                  </div>

                  {/* STUDENT FIELDS */}
                  {formData.userType === "Student" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <DatePicker
                        selected={formData.dob ? new Date(formData.dob) : null}
                        onChange={(date) =>
                          setFormData((prev) => ({
                            ...prev,
                            dob: format(date, 'yyyy-MM-dd'), // ensures correct date
                          }))
                        }
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        required
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        placeholderText="Date of Birth"
                        className="input-style w-full"
                      />
                      <input
                        type="text"
                        name="religion"
                        required
                        placeholder="Religion"
                        value={formData.religion}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="bloodGroup"
                        required
                        placeholder="Blood Group"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="medicalCondition"
                        placeholder="Medical Condition (optional)"
                        value={formData.medicalCondition}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="percentagePreviousClass"
                        required
                        placeholder="Previous Class Percentage"
                        value={formData.percentagePreviousClass}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="branch"
                        required
                        placeholder="Branch applied for..."
                        value={formData.branch}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="input-style"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <input
                        type="text"
                        name="grade"
                        required
                        placeholder="Grade (eg. 11, 12)"
                        value={formData.grade}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="academicYear"
                        required
                        placeholder="Academic Year (e.g. 2024-2025)"
                        value={formData.academicYear}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <select
                        name="month"
                        required
                        value={formData.month}
                        onChange={handleChange}
                        className="input-style"
                      >
                        <option value="">Select Admission Month</option>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="medium"
                        required
                        placeholder="Medium (e.g. English, Hindi)"
                        value={formData.medium}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="schoolName"
                        required
                        placeholder="SchoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="subjects"
                        required
                        placeholder="Subjects (comma separated)"
                        value={formData.subjects}
                        onChange={handleChange}
                        className="input-style"
                      />

                      {/* PARENT DETAILS  */}
                      <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's Name"
                        required
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="motherName"
                        placeholder="Mother's Name"
                        required
                        value={formData.motherName}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <div className="flex items-center gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm"
                        >
                          <option value="+91">India (+91)</option>
                          <option value="+977">Nepal (+977)</option>
                          <option value="+1">USA (+1)</option>
                          <option value="+44">UK (+44)</option>
                        </select>
                        <input
                          type="text"
                          name="fatherContact"
                          placeholder="Father's Contact"
                          required
                          value={formData.fatherContact}
                          onChange={handleChange}
                          className="input-style"
                        />
                      </div>
                      <input
                        type="text"
                        name="fatherOccupation"
                        placeholder="Father's Occupation"
                        required
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="motherOccupation"
                        placeholder="Mother's Occupation"
                        required
                        value={formData.motherOccupation}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="guardianName"
                        placeholder="Guardian's Name"
                        required
                        value={formData.guardianName}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="guardianRelation"
                        required
                        placeholder="Guardian's Relation"
                        value={formData.guardianRelation}
                        onChange={handleChange}
                        className="input-style"
                      />
                    </div>
                  )}
                </div>

              )}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
