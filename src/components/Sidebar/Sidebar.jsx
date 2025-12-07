import {
  LayoutDashboard,
  FileText,
  List,
  Bell,
  User,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({
  userRole,
  currentPage,
  onNavigate,
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const studentMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "student-dashboard" },
    { icon: FileText, label: "Submit Complaint", page: "complaint-form" },
    { icon: List, label: "My Complaints", page: "my-complaints" },
    { icon: Bell, label: "Notifications", page: "notifications" },
    { icon: User, label: "Profile", page: "profile" },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "admin-dashboard" },
    { icon: List, label: "All Complaints", page: "all-complaints" },
    { icon: BarChart3, label: "Analytics", page: "analytics" },
    { icon: Bell, label: "Notifications", page: "admin-notifications" },
    { icon: User, label: "Profile", page: "profile" },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = userRole === "admin" ? adminMenuItems : studentMenuItems;

  const SidebarContent = () => (
    <>
      {/* LOGO SECTION */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-center h-24">
        <img
          src="Logo.png"
          alt="University Logo"
          className="object-contain"
          style={{ width: "135px", height: "auto" }}
        />
      </div>

      {/* MENU ITEMS */}


    <div className="flex-1 p-4 space-y-1">
      <Link
        to="/"
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300
        ${currentPath === "/dashboard" ? "bg-[#1C398E] text-white font-bold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
      >
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </Link>

      <Link
        to="/submit-complaint"
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300
        ${currentPath === "/submit-complaint" ? "bg-[#1C398E] text-white font-bold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
      >
        <FileText className="w-5 h-5" />
        Submit Complaint
      </Link>

      <Link
        to="/"
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300
        ${currentPath === "/my-complaints" ? "bg-[#1C398E] text-white font-bold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
      >
        <List className="w-5 h-5" />
        My Complaints
      </Link>

      <Link
        to="/"
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300
        ${currentPath === "/notifications" ? "bg-[#1C398E] text-white font-bold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
      >
        <Bell className="w-5 h-5" />
        Notifications
      </Link>

      <Link
        to="/profile"
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300
        ${currentPath === "/profile" ? "bg-[#1C398E] text-white font-bold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
      >
        <User className="w-5 h-5" />
        Profile
      </Link>
    </div>

      {/* LOGOUT BUTTON — FIXED BOTTOM */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE MENU TOGGLE */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* MOBILE SIDEBAR */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-white flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 flex-col justify-between h-screen
     fixed top-0 left-0 z-40">
        <SidebarContent />
      </div>
    </>
  );
}
