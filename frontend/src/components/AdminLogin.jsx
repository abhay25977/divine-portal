import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4010/api/admin/login", formData);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="w-full border p-2 mb-3" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="w-full border p-2 mb-3" />
        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
