import React from "react";

const TeacherFields = ({ formData, handleChange }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        name="subjectSpecialization"
        placeholder="Subject Specialization"
        value={formData.subjectSpecialization}
        onChange={handleChange}
        className="input-style w-full"
      />
    </div>
  );
};

export default TeacherFields;
