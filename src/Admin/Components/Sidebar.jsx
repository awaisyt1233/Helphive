import {
  LayoutDashboard,
  Bell,
  User,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // ADMIN MENU ONLY
  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "/admin" },
    { icon: BarChart3, label: "Analytics", page: "/admin/analytics" },
    { icon: User, label: "Manage Users", page: "/admin/manage-users" },
    { icon: Bell, label: "Notifications", page: "/admin/notifications" },
    { icon: User, label: "Profile", page: "/profile" },
  ];

  const SidebarContent = () => (
    <>
      {/* LOGO */}
      <div className="p-6 border-b border-gray-200 flex flex-col items-center justify-center h-24">
        <img
          src="/Logo.png"
          alt="University Logo"
          className="object-contain"
          style={{ width: "180px", height: "auto" }}
        />
        <span className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">
          Admin Panel
        </span>
      </div>

      {/* MENU ITEMS */}
      <div className="flex-1 p-4 space-y-1">
        {adminMenuItems.map((item) => (
          <Link
            key={item.label}
            to={item.page}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300
              ${
                currentPath === item.page
                  ? "bg-[#1C398E] text-white font-bold"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* LOGOUT */}
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
      {/* MOBILE MENU BUTTON */}
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
      <div className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 flex-col justify-between h-screen fixed top-0 left-0 z-40">
        <SidebarContent />
      </div>
    </>
  );
}
