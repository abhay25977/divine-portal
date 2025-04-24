import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import Select from 'react-select';

const RegisterModal = ({ isOpen, onClose, value, onChange }) => {


  const subjectOptions = [
    { value: 'Nepali', label: 'Nepali' },
    { value: 'English', label: 'English' },
    { value: 'Compulsary Math', label: 'Compulsary Math' },
    { value: 'Science', label: 'Science' },
    { value: 'Optional Math', label: 'Optional Math' },
    { value: 'Accounts', label: 'Accounts' },
    { value: 'Computer Course', label: 'Computer Course' },
    { value: '10th Bridge Course', label: '10th Bridge Course' },
    // Add more subjects here
  ];

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
    courseDuration: "",
    grade: "",
    bsAcademicYear: "",
    adAcademicYear: "",
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
    countryCode: '',
    fatherCountryCode: '',
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

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "divine-academy");

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const res = await axios.post("https://api.cloudinary.com/v1_1/dd2u7z5bc/image/upload", data, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      setFormData((prev) => ({ ...prev, profilePicture: res.data.secure_url }));
    } catch (err) {
      console.error("Profile picture upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEndpoint = `http://localhost:4010/api/${formData.userType.toLowerCase()}/register`;
      const res = await axios.post(apiEndpoint, formData);

      toast.success(res.data.message || "Registration successful!");

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
        courseDuration: "",
        grade: "",
        bsAcademicYear: "",
        adAcademicYear: "",
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
        countryCode: '',
        fatherCountryCode: '',
      });

      setTimeout(() => {
        onClose();
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
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
      formData.profilePicture,
      formData.religion,
      formData.courseType,
      formData.courseDuration,
      formData.grade,
      formData.bsAcademicYear,
      formData.adAcademicYear,
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
      formData.countryCode,
      formData.fatherCountryCode,
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
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
                    <div className="flex items-center gap-2 sm:w-auto">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={(e) => {
                          const selectedCode = e.target.value;
                          setFormData({
                            ...formData,
                            countryCode: selectedCode,
                            contact: selectedCode + ' ' // Pre-fill phone input with country code and space
                          });
                        }}
                        className="w-36 sm:w-40 text-sm px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"

                      >
                        <option>Select Code</option>
                        <option value="+977">Nepal (+977)</option>
                        <option value="+91">India (+91)</option>
                        <option value="+1">USA (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+971">UAE (+971)</option>
                        <option value="+966">Saudi Arabia (+966)</option>
                        <option value="+90">Turkey (+90)</option>
                        <option value="+7">Russia (+7)</option>
                        <option value="+34">Spain (+34)</option>
                        <option value="+55">Brazil (+55)</option>
                        <option value="+65">Singapore (+65)</option>
                      </select>

                      <input
                        type="text"
                        name="contact"
                        placeholder="Your Contact"
                        required
                        value={formData.contact}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/[^0-9+ ]/g, '');
                          setFormData({ ...formData, contact: inputValue });
                        }}
                        maxLength={15}
                        className="w-full sm:w-3/4 px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-sm"
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
                        maxDate={new Date()} // 🔒 restricts to today or earlier
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
                        placeholder="Previous Class Percentage (e.g., 95)"
                        value={formData.percentagePreviousClass}
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^(100(\.0)?|[0-9]{1,2}(\.[0-9])?)?$/;
                          if (value === '' || regex.test(value)) {
                            handleChange(e);
                          }
                        }}
                        className="input-style"
                      />

                      <select
                        name="branch"
                        required
                        value={formData.branch}
                        onChange={handleChange}
                        className="input-style"
                      >
                        <option value="">Select Branch</option>
                        <option value="Malangwa, Sarlahi">Malangwa, Sarlahi</option>
                        <option value="Barahathwa, Sarlahi">Barahathwa, Sarlahi</option>
                        <option value="Bailbas, Sarlahi">Bailbas, Sarlahi</option>
                      </select>

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
                        placeholder="Grade Level (eg. 11, 12)"
                        value={formData.grade}
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^(100(\.0)?|[0-9]{1,2}(\.[0-9])?)?$/;
                          if (value === '' || regex.test(value)) {
                            handleChange(e);
                          }
                        }}
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
                      <div className="mb-4">
                        <label className="block mb-1 font-medium">Academic Year</label>
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <select
                            name="bsAcademicYear"
                            value={formData.bsAcademicYear}
                            onChange={handleChange}
                            required
                            className="text-sm px-3 py-2 bg-gray-100 border border-gray-300 rounded-md w-full sm:w-auto"
                          >
                            <option value="">Select B.S. Year</option>
                            <option value="2080-2081">2080-2081 B.S.</option>
                            <option value="2081-2082">2081-2082 B.S.</option>
                            <option value="2082-2083">2082-2083 B.S.</option>
                            {/* Add more B.S. years as needed */}
                          </select>

                          <select
                            name="adAcademicYear"
                            value={formData.adAcademicYear}
                            onChange={handleChange}
                            required
                            className="text-sm px-3 py-2 bg-gray-100 border border-gray-300 rounded-md w-full sm:w-auto"
                          >
                            <option value="">Select A.D. Year</option>
                            <option value="2023-2024">2023-2024 A.D.</option>
                            <option value="2024-2025">2024-2025 A.D.</option>
                            <option value="2025-2026">2025-2026 A.D.</option>
                            {/* Add more A.D. years as needed */}
                          </select>
                        </div>
                      </div>

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
                      <select
                        type="text"
                        name="medium"
                        required
                        value={formData.medium}
                        onChange={handleChange}
                        className="input-style"
                      >
                        <option value="">Select Medium</option>
                        <option value="English">Nepali</option>
                        <option value="Hindi">English</option>
                      </select>
                      <input
                        type="text"
                        name="schoolName"
                        required
                        placeholder="School Name"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <Select
                        isMulti
                        name="subjects"
                        options={subjectOptions}
                        value={subjectOptions.filter(option => formData.subjects.includes(option.value))}
                        onChange={(selectedOptions) =>
                          setFormData({
                            ...formData,
                            subjects: selectedOptions.map(option => option.value),
                          })
                        }
                        placeholder="Select subjects"
                        className="w-full sm:w-auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: '38px',
                            borderRadius: '0.375rem',
                            borderColor: '#D1D5DB',
                            backgroundColor: '#F9FAFB',
                            fontSize: '0.875rem',
                          }),
                          multiValue: (styles) => ({
                            ...styles,
                            backgroundColor: '#E5E7EB',
                            borderRadius: '4px',
                            padding: '2px 6px',
                          }),
                          placeholder: (styles) => ({
                            ...styles,
                            fontSize: '0.875rem',
                          }),
                        }}
                      />

                      <input
                        type="text"
                        name="courseType"
                        required
                        placeholder="Course Type (e.g. Regular)"
                        value={formData.courseType}
                        onChange={handleChange}
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="courseDuration"
                        required
                        placeholder="Course Duration (e.g. 1 Year/ 6 Months)"
                        value={formData.courseDuration}
                        onChange={handleChange}
                        className="input-style placeholder:text-sm"
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
                          name="fatherCountryCode"
                          value={formData.fatherCountryCode}
                          onChange={(e) => {
                            const selectedCode = e.target.value;
                            setFormData({
                              ...formData,
                              fatherCountryCode: selectedCode,
                              fatherContact: selectedCode + ' ' // Pre-fill with selected code
                            });
                          }}
                          className="text-xs px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                        >
                          <option>Select Code</option>
                          <option value="+977">Nepal (+977)</option>
                          <option value="+91">India (+91)</option>
                          <option value="+1">USA (+1)</option>
                          <option value="+44">UK (+44)</option>
                          <option value="+971">UAE (+971)</option>
                          <option value="+966">Saudi Arabia (+966)</option>
                          <option value="+90">Turkey (+90)</option>
                          <option value="+7">Russia (+7)</option>
                          <option value="+34">Spain (+34)</option>
                          <option value="+55">Brazil (+55)</option>
                          <option value="+65">Singapore (+65)</option>
                        </select>

                        <input
                          type="text"
                          name="fatherContact"
                          placeholder="Father's Contact"
                          required
                          value={formData.fatherContact}
                          onChange={(e) => {
                            const inputValue = e.target.value.replace(/[^0-9+ ]/g, ''); // allow numbers, + and space
                            setFormData({ ...formData, fatherContact: inputValue });
                          }}
                          maxLength={15}
                          className="w-full sm:w-3/4 px-3 py-2 border border-gray-300 rounded-md text-sm placeholder:text-sm"
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
                      <div className="mb-4">
                        <label className="block mb-1 font-medium">Upload Profile Picture</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          required
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                         file:bg-yellow-50 file:text-yellow-700
                         hover:file:bg-yellow-100
                         dark:file:bg-gray-800 dark:file:text-yellow-400 dark:hover:file:bg-gray-700"
                        />

                        {isUploading && (
                          <div className="mt-2 flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{uploadProgress}%</span>
                          </div>
                        )}

                        {!isUploading && formData.profilePicture && uploadProgress === 100 && (
                          <div className="mt-2 text-green-600 font-medium text-sm">"Image Uploaded"</div>
                        )}
                      </div>


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
