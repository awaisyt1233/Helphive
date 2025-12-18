import React, { useState } from "react";
import { Bell, CheckCircle, Hourglass, AlertTriangle } from "lucide-react";
import { Eye } from "lucide-react";

export default function Home() {
  const [recentComplaints, setRecentComplaints] = useState([
    {
      id: 1,
      title: "Hostel Water Supply Issue",
      category: "Hostel",
      status: "In Progress",
      date: "2025-11-05",
      description: "No water supply in hostel block A",
    },
    {
      id: 2,
      title: "Library AC Not Working",
      category: "Department",
      status: "Resolved",
      date: "2025-11-01",
      description: "Air conditioning in library not functional",
    },
    {
      id: 3,
      title: "Faculty Not Available",
      category: "Faculty",
      status: "In Progress",
      date: "2025-11-03",
      description: "Dr. Smith not available during office hours",
    },
    {
      id: 4,
      title: "Cafeteria Food Quality",
      category: "Hostel",
      status: "Pending",
      date: "2025-11-04",
      description: "Poor quality food being served",
    },
  ]);

  // Status badge colors
  const statusStyle = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "In Progress") return "bg-blue-100 text-blue-800";
    if (status === "Resolved") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4 p-2">
        <p>
          Welcome back, <span className="text-black font-semibold">Student</span>
        </p>

        <div className="relative">
          <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
          {/* red dot */}
          <span className="absolute top-0 right-0.5 block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-blue-700">
              <Bell className="w-5 h-5" />
              <h2 className="text-sm">Total Complaints</h2>
            </div>
            <p className="text-xl font-bold mt-1" style={{ color: "#1C398E" }}>
              4
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <h2 className="text-sm">Resolved</h2>
            </div>
            <p className="text-xl font-bold mt-1 text-green-600">1</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Hourglass className="w-5 h-5" />
              <h2 className="text-sm">In Progress</h2>
            </div>
            <p className="text-xl font-bold mt-1" style={{ color: "#1C398E" }}>
              2
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-sm">Pending</h2>
            </div>
            <p className="text-xl font-bold mt-1 text-yellow-600">1</p>
          </div>
        </div>

        {/* Submit Complaint Button */}
        <button
          className="bg-white text-[#1C398E] px-4 py-2 rounded-lg font-medium 
          hover:bg-[#1C398E] hover:text-white hover:font-bold 
          transition-colors duration-300"
        >
          + Submit New Complaint
        </button>

        {/* Recent Complaints Section */}
        <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>

          <div className="space-y-4">
            {recentComplaints.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No recent complaints</p>
            ) : (
              recentComplaints.map((c) => (
                <div
                  key={c.id}
                  className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-gray-900">{c.title}</h3>
                      <p className="text-sm text-gray-600">{c.description}</p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${statusStyle(c.status)}`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-3 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{c.category}</span>
                      <span>{new Date(c.date).toLocaleDateString()}</span>
                    </div>

                    <button className="flex items-center gap-1 text-gray-500 hover:text-black text-sm border border-gray-300 px-3 py-1 rounded-2xl hover:bg-gray-50">
                      <Eye className="w-4 h-4 text-gray-500 " />
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
