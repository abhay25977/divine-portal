import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion, AnimatePresence } from "framer-motion";
import RegisterModal from "./RegisterModal";

const LoginModal = ({ isOpen, onClose }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:4010/api/student/login", formData);
      const { token, student } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("student", JSON.stringify(student));

      toast.success(res.data.message || "Login successful!");

      onClose();
      navigate("/student/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  const handleAdminRedirect = () => {
    onClose();
    navigate("/admin/login");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-md p-8 rounded-xl shadow-xl relative overflow-y-auto max-h-[90vh]"
              initial={{ y: "-20%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-20%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              toastClassName="w-full max-w-full rounded-none text-center shadow-lg"
              bodyClassName="text-md font-semibold"
            />
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-xl font-bold text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-center text-red-700 dark:text-red-400 mb-6">
                Login Form
              </h2>

              {errorMsg && (
                <div className="bg-red-100 dark:bg-red-950 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-300 mb-3 disabled:opacity-70"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <button
                onClick={handleAdminRedirect}
                className="w-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300"
              >
                Admin Login
              </button>

              <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    setShowRegisterModal(true);
                  }}
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  Register
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mount outside AnimatePresence for seamless transition */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </>
  );
};

export default LoginModal;
