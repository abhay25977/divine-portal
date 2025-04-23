import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);


  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const studentRes = await axios.get("http://localhost:4010/api/admin/students", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(studentRes.data);

    const teacherRes = await axios.get("http://localhost:4010/api/admin/teachers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTeachers(teacherRes.data);
  };

 const confirmDelete = async () => {
  if (!userToDelete) return;

  await axios.delete(`http://localhost:4010/api/admin/delete/${userToDelete.role}/${userToDelete.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  setShowDeleteConfirm(false);
  setUserToDelete(null);
  fetchUsers();
};


  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Students</h3>
        {students.map((stu) => (
          <div
            key={stu._id}
            className="flex justify-between items-center bg-yellow-100 p-2 mb-2 rounded cursor-pointer hover:bg-yellow-200 transition"
            onClick={() => handleUserClick(stu)}
          >
            <span>{stu.name} ({stu.email})</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUserToDelete({ role: "student", id: stu._id });
                setShowDeleteConfirm(true);
              }}
              
              className="text-red-600 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Teachers</h3>
        {teachers.map((tch) => (
          <div
            key={tch._id}
            className="flex justify-between items-center bg-green-100 p-2 mb-2 rounded"
          >
            <span>{tch.name} ({tch.email})</span>
            <button
              onClick={() => handleDelete("teacher", tch._id)}
              className="text-red-600 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[500px] shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Student Details</h2>

            <div className="mb-4 flex flex-col gap-2">
            <p><strong>StudentId:</strong> {selectedUser.studentId}</p>
            <p><strong>Name:</strong> {selectedUser.firstName + " " + selectedUser.middleName + selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p> 
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>DOB:</strong> {selectedUser.dob}</p>
            <p><strong>Academic Year:</strong> {selectedUser.academicYear}</p>
            <p><strong>Address:</strong> {selectedUser.district}</p>
            </div>  
            {/* Add more fields here if needed */}
          </div>

        </div>
      )}

{showDeleteConfirm && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[400px] shadow-xl text-center relative">
      <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this user?</h3>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Yes
        </button>
        <button
          onClick={() => {
            setShowDeleteConfirm(false);
            setUserToDelete(null);
          }}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ManageUsers;
