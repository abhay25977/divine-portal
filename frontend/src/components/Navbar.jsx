import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const getUserFromStorage = (key) => {
  try {
    const user = JSON.parse(localStorage.getItem(key));
    return user && typeof user === "object" ? user : null;
  } catch (err) {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Safely get users
  const student = getUserFromStorage("student");
  const teacher = getUserFromStorage("teacher");
  const admin = getUserFromStorage("admin");

  const authUser = student || teacher || admin;
  const role = student ? "student" : teacher ? "teacher" : admin ? "admin" : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!authUser || !role) return null; // still safe fallback

  const commonLinks = {
    student: [
      { to: "/student/dashboard", label: "Dashboard" },
      { to: "/courses", label: "My Courses" },
    ],
    teacher: [
      { to: "/teacher/dashboard", label: "Dashboard" },
      { to: "/teacher/classes", label: "My Classes" },
    ],
    admin: [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/users", label: "Manage Users" },
    ],
  };

  return (
    <>
      <nav className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md fixed w-full z-50">
        <div className="text-xl font-bold">
          DIVINE ACADEMY <span className="text-yellow-300 capitalize">({role})</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          {commonLinks[role].map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-yellow-300">
              {link.label}
            </Link>
          ))}
          <div className="bg-white text-red-600 px-3 py-1 rounded shadow-md font-medium">
            User Name: {authUser?.name}
          </div>
          <img
            src={authUser?.profilePicture || "/avatar-placeholder.png"}
            className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
            alt="User Avatar"
          />
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-red-900 px-3 py-1 rounded hover:bg-yellow-300"
          >
            Logout
          </button>
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)} className="text-2xl">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-1/2 h-full bg-red-700 z-50 shadow-lg flex flex-col items-center justify-center gap-6 text-white"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {commonLinks[role].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-yellow-300"
              >
                {link.label}
              </Link>
            ))}

            <div className="bg-white text-red-600 px-3 py-1 rounded shadow-md font-medium text-center">
              User Name: {authUser.name}
            </div>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-yellow-400 text-red-900 px-3 py-1 rounded hover:bg-yellow-300"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
