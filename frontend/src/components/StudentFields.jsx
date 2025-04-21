import React from "react";
import DatePicker from "react-datepicker";

const StudentFields = ({ formData, handleChange, setFormData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {["branch", "district", "medium", "grade", "academicYear", "month"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
          required
          value={formData[field]}
          onChange={handleChange}
          className="input-style"
        />
      ))}
      <DatePicker
        selected={formData.dob ? new Date(formData.dob) : null}
        onChange={(date) =>
          setFormData((prev) => ({ ...prev, dob: date.toISOString().split("T")[0] }))
        }
        dateFormat="dd-MM-yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="Select Date of Birth"
        className="input-style w-full"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        className="input-style"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        name="subjects"
        placeholder="Subjects (comma-separated)"
        value={formData.subjects}
        onChange={handleChange}
        className="input-style sm:col-span-2"
      />
    </div>
  );
};

export default StudentFields;
