import React, { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">

        <div className="flex justify-center">
          <div className="bg-blue-900 p-4 rounded-full">
            <User className="h-10 w-10 text-white" />
          </div>
        </div>

        <h2 className="text-center text-xl font-bold text-blue-900">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Sign up to submit and track complaints
        </p>

        {/* Name */}
        <div>
          <label className="text-gray-800 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mt-1 p-3 border rounded-xl bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-blue-900"
                       
          />
        </div>

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

        {/* Mobile */}
        <div>
          <label className="text-gray-800 font-medium">Mobile Number</label>
          <input
            type="text"
            placeholder="03XXXXXXXXX"
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

        {/* Confirm Password */}
        <div>
          <label className="text-gray-800 font-medium">Confirm Password</label>
          <div className="relative mt-1">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="•••••••"
              className="w-full p-3 border rounded-xl bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800">
          Create Account
        </button>

        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-900 font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
