import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaChartBar, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const cards = [
    {
      title: "Manage Students",
      icon: <FaUserGraduate className="text-3xl text-white" />,
      color: "bg-blue-600",
      link: "/admin/users",
    },
    {
      title: "Manage Teachers",
      icon: <FaChalkboardTeacher className="text-3xl text-white" />,
      color: "bg-green-600",
      link: "/admin/teachers",
    },
    {
      title: "Manage Courses",
      icon: <FaBookOpen className="text-3xl text-white" />,
      color: "bg-purple-600",
      link: "/courses",
    },
    {
      title: "System Analytics",
      icon: <FaChartBar className="text-3xl text-white" />,
      color: "bg-red-600",
      link: "/admin/analytics",
    },
    {
      title: "Manage Users",
      icon: <FaUsers className="text-3xl text-white" />,
      color: "bg-yellow-600",
      link: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 mt-14">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, <span className="font-semibold">{admin?.name}</span></p>
          <p className="text-sm text-gray-500">Admin ID: {admin?._id}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`${card.color} p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-md">
                  {card.icon}
                </div>
                <h2 className="text-xl text-white font-semibold">{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
