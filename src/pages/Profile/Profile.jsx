import { useState } from "react";
import { User, Mail, Phone, Building2, Calendar, Shield, Upload, Lock } from "lucide-react";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@uni.edu",
    phone: "0300-1234567",
    department: "Computer Science",
    studentId: "STU-2021-001",
    joinDate: "2021-08-15",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account information and security
        </p>
      </div>

      {/* Profile Picture */}
      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Profile Picture</h2>
        <p className="text-gray-500 text-sm">Update your profile picture</p>

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-600">
            <User />
          </div>

          <div>
            <button className="bg-blue-900 text-white px-4 py-2 rounded flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload New Picture
            </button>

            <p className="text-gray-500 text-xs mt-2">
              JPG, GIF or PNG. Max size of 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-500 text-sm">Update your personal details</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              Full Name
            </label>
            <input
              className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              Email
            </label>
            <input
              className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              Phone Number
            </label>
            <input
              className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              Department
            </label>
            <input
              className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
              value={profileData.department}
              onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              Student ID
            </label>
            <input
              disabled
              className="w-full rounded-xl px-3 py-2 bg-gray-200 cursor-not-allowed"
              value={profileData.studentId}
            />
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              Join Date
            </label>
            <input
              disabled
              className="w-full rounded-xl px-3 py-2 bg-gray-200 cursor-not-allowed"
              value={profileData.joinDate}
            />
          </div>
        </div>

        <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>

      {/* Security */}
      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Security</h2>
        <p className="text-gray-500 text-sm">
          Change your password to keep your account secure
        </p>

        <div className="space-y-3">
          <input
            placeholder="Enter current password"
            type="password"
            className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
          />

          <input
            placeholder="Enter new password"
            type="password"
            className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
            value={passwordData.new}
            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
          />

          <input
            placeholder="Confirm new password"
            type="password"
            className="w-full rounded-xl px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
          />
        </div>

        <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Change Password
        </button>
      </div>

      {/* Account Statistics */}
      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Account Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Account Type</p>
            <p className="text-gray-800 mt-1">Student</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Complaints</p>
            <p className="text-gray-800 mt-1">4</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">Resolved Complaints</p>
            <p className="text-green-600 mt-1">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
