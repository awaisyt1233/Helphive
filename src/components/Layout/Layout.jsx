import { Outlet } from "react-router-dom";

export default function DashboardLayout({ sidebar }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        {sidebar}
      </aside>

      {/* Main Panel */}
      <main className="flex-1">
        <Outlet /> {/* <-- Child routes render here */}
      </main>

    </div>
  )
}
  