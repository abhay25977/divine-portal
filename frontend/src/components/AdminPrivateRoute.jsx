import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!token || !admin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminPrivateRoute;
