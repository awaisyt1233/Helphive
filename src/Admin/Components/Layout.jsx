import { Outlet } from "react-router-dom";

export default function AdminLayout({ sidebar }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-40">
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
}
