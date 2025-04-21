import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const StudentDashboard = ({ student: initialStudent }) => {
  const [student, setStudent] = useState(initialStudent || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialStudent) {
      const storedStudent = JSON.parse(localStorage.getItem("student"));
      if (storedStudent) {
        setStudent(storedStudent);
      } else {
        navigate("/login");
      }
    }
  }, [initialStudent, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-red-100 p-4 md:p-6 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-yellow-200 p-4 rounded-xl shadow-md mb-6 md:mb-0 mt-14 md:mt-14">
        <h3 className="text-xl font-semibold mb-6 text-red-800 text-center">Dashboard</h3>
        <ul className="space-y-4">
          <li><Link to="/student/dashboard/my-subjects" className="flex items-center gap-2 text-red-800 hover:text-red-700">📚 My Subjects</Link></li>
          <li><Link to="/student/dashboard/assignments" className="flex items-center gap-2 text-red-800 hover:text-red-700">📝 Assignments</Link></li>
          <li><Link to="/student/dashboard/attendance" className="flex items-center gap-2 text-red-800 hover:text-red-700">📅 Attendance</Link></li>
          <li><Link to="/student/dashboard/grades" className="flex items-center gap-2 text-red-800 hover:text-red-700">📊 Grades</Link></li>
          <li><Link to="/student/dashboard/class-schedule" className="flex items-center gap-2 text-red-800 hover:text-red-700">🕒 Class Schedule</Link></li>
          <li><Link to="/student/dashboard/profile-settings" className="flex items-center gap-2 text-red-800 hover:text-red-700">🧾 Profile & Settings</Link></li>
          <li><Link to="/student/dashboard/messages" className="flex items-center gap-2 text-red-800 hover:text-red-700">💬 Messages</Link></li>
          <li><Link to="/student/dashboard/live-classes" className="flex items-center gap-2 text-red-800 hover:text-red-700">🎥 Live Classes</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 md:ml-6 mt-6 md:mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 text-center">
          Welcome, {student?.name || "Student"} 🎓
        </h2>

        {/* Student Info */}
        {student && (
          <div className="bg-yellow-200 rounded-xl p-4 md:p-6 shadow-md mb-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-red-800">Student Details</h3>
            <p><span className="font-medium">Name:</span> {student.name}</p>
            <p><span className="font-medium">Student ID:</span> {student.studentId}</p>
            <p><span className="font-medium">Email:</span> {student.email}</p>
          </div>
        )}

        {/* Route Content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
