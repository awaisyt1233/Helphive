import React, { useState } from "react";
import { Search, Edit, Trash2, UserPlus, User as UserIcon, Shield, GraduationCap } from "lucide-react";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john.doe@university.edu", role: "Student", department: "Computer Science", studentId: "STU-2021-001", status: "Active", joinDate: "2021-08-15" },
  { id: 2, name: "Jane Smith", email: "jane.smith@university.edu", role: "Student", department: "Electrical Engineering", studentId: "STU-2021-045", status: "Active", joinDate: "2021-08-15" },
  { id: 3, name: "Dr. Robert Wilson", email: "robert.wilson@university.edu", role: "Faculty", department: "Computer Science", studentId: "FAC-2018-012", status: "Active", joinDate: "2018-07-01" },
  { id: 4, name: "Admin User", email: "admin@university.edu", role: "Admin", department: "Administration", studentId: "ADM-2019-001", status: "Active", joinDate: "2019-01-15" },
  { id: 5, name: "Sarah Williams", email: "sarah.williams@university.edu", role: "Student", department: "Civil Engineering", studentId: "STU-2021-078", status: "Active", joinDate: "2021-08-15" },
];

export default function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = (userId) => alert(`Edit user #${userId} - Feature coming soon!`);
  const handleDeleteUser = (userId, userName) => alert(`User "${userName}" has been deleted successfully.`);

  const totalUsers = mockUsers.length;
  const totalStudents = mockUsers.filter(u => u.role === "Student").length;
  const totalFaculty = mockUsers.filter(u => u.role === "Faculty").length;
  const totalAdmins = mockUsers.filter(u => u.role === "Admin").length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600">View and manage all system users</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <UserPlus className="w-5 h-5" /> Add New User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-lg font-bold text-blue-600">{totalUsers}</p>
          </div>
          <UserIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Students</p>
            <p className="text-lg font-bold text-green-600">{totalStudents}</p>
          </div>
          <GraduationCap className="w-6 h-6 text-green-600" />
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Faculty</p>
            <p className="text-lg font-bold text-blue-600">{totalFaculty}</p>
          </div>
          <UserIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Admins</p>
            <p className="text-lg font-bold text-red-600">{totalAdmins}</p>
          </div>
          <Shield className="w-6 h-6 text-red-600" />
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users by name, email, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Users List as Cards */}
      <div className="space-y-4">
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white shadow rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="font-bold text-gray-900">{user.name}</div>
              <div className="text-gray-500 text-sm">{user.studentId}</div>
              <div className="text-gray-700">{user.email}</div>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                user.role === "Student" ? "bg-green-100 text-green-800" :
                user.role === "Faculty" ? "bg-blue-100 text-blue-800" :
                "bg-red-100 text-red-800"
              }`}>{user.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                onClick={() => handleEditUser(user.id)}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                onClick={() => handleDeleteUser(user.id, user.name)}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
