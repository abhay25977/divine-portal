import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

import LoginModal from "./pages/authPage/LoginModal";
import RegisterModal from "./pages/authPage/RegisterModal";

import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";
import ManageUsers from "./components/admin/ManageUsers";

import CoursePage from "./pages/CoursePage";

import StudentDashboard from "./components/Student/Dashboard/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";

// Student Sidebar Links Routes 
import Attendance from "./components/Student/Attendance";
import Assignment from "./components/Student/Assignment";
import ClassSchedule from "./components/Student/ClassSchedule";
import Grades from "./components/Student/grades";
import LiveClasses from "./components/Student/LiveClasses";
import Messages from "./components/Student/Messages";
import Profile from "./components/Student/Profile";
import MySubjects from "./components/Student/MySubjects"; // Import MySubjects

function App() {
  const student = JSON.parse(localStorage.getItem("student"));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/courses" element={<CoursePage />} />

        {/* Student Dashboard with nested routes */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard student={student} />
            </PrivateRoute>
          }
        >
          <Route path="my-subjects" element={<MySubjects />} /> {/* Nested Route */}
          <Route path="attendance" element={<Attendance />} /> {/* Nested Route */}
          <Route path="assignments" element={<Assignment />} /> {/* Nested Route */}
          <Route path="class-schedule" element={<ClassSchedule />} /> {/* Nested Route */}
          <Route path="grades" element={<Grades />} /> {/* Nested Route */}
          <Route path="profile-settings" element={<Profile />} /> {/* Nested Route */}
          <Route path="messages" element={<Messages />} /> {/* Nested Route */}
          <Route path="live-classes" element={<LiveClasses />} /> {/* Nested Route */}
          {/* Add other routes for the student dashboard here */}
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <ManageUsers />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
