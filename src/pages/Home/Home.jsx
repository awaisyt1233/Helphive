import React from "react";
import { Bell } from "lucide-react";

export default function Home() {
  return (
    <>
          <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4 p-2">
        <p>
          Welcome back,{" "}
          <span className="text-black font-semibold">Student</span>
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
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
          <h2
            className="text-sm flex items-center gap-2"
            style={{ color: "#1C398E" }}
          >
            Total Complaints <span>📄</span>
          </h2>
          <p className="text-xl font-bold mt-2" style={{ color: "#1C398E" }}>
            4
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
          <h2
            className="text-sm flex items-center gap-2"
            style={{ color: "#1C398E" }}
          >
            Resolved <span>✅</span>
          </h2>
          <p className="text-xl font-bold mt-2 text-green-600">1</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
          <h2
            className="text-sm flex items-center gap-2"
            style={{ color: "#1C398E" }}
          >
            In Progress <span>⏳</span>
          </h2>
          <p className="text-xl font-bold mt-2" style={{ color: "#1C398E" }}>
            2
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
          <h2
            className="text-sm flex items-center gap-2"
            style={{ color: "#1C398E" }}
          >
            Pending <span>⚠️</span>
          </h2>
          <p className="text-xl font-bold mt-2 text-yellow-600">1</p>
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
    </div>
    </>
  );
}
