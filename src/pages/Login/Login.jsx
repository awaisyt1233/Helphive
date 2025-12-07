import React, { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-blue-900 p-4 rounded-full">
            <User className="h-10 w-10 text-white" />
          </div>
        </div>

        <h2 className="text-center text-xl font-bold text-blue-900">
          University Complaint Management
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Login to submit and track complaints
        </p>

        {/* Email */}
        <div>
          <label className="text-gray-800 font-medium">Email</label>
          <input
            type="email"
            placeholder="student@university.edu"
            className="w-full mt-1 p-3 border rounded-xl bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-800 font-medium">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="•••••••"
              className="w-full p-3 border rounded-xl bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800">
          Login
        </button>

        <p className="text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-900 font-semibold hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
