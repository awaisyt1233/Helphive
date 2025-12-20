import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  UserPlus,
  CheckCheck,
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock data
const mockComplaints = [
  { id: 1, studentName: "John Doe", studentId: "STU-2021-001", department: "Computer Science", title: "Hostel Water Supply Issue", category: "Hostel", status: "Pending", priority: "High", date: "2025-11-05", resolutionTime: 0 },
  { id: 2, studentName: "Jane Smith", studentId: "STU-2021-045", department: "Electrical Engineering", title: "Faculty Not Available", category: "Faculty", status: "In Progress", priority: "Medium", date: "2025-11-03", resolutionTime: 2 },
  { id: 3, studentName: "Mike Johnson", studentId: "STU-2020-123", department: "Mechanical Engineering", title: "Library AC Not Working", category: "Library", status: "Resolved", priority: "Low", date: "2025-11-01", resolutionTime: 4 },
  { id: 4, studentName: "Sarah Williams", studentId: "STU-2021-078", department: "Civil Engineering", title: "Cafeteria Food Quality", category: "Infrastructure", status: "Pending", priority: "High", date: "2025-11-06", resolutionTime: 0 },
];

// Category stats for pie chart
const categoryData = [
  { name: "Hostel", value: 28 },
  { name: "Faculty", value: 20 },
  { name: "Department", value: 17 },
  { name: "Infrastructure", value: 15 },
  { name: "Library", value: 11 },
  { name: "Other", value: 9 },
];
const COLORS = ["#1E40AF", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

// Monthly trends for bar chart
const monthlyData = [
  { month: "Jun", complaints: 45 },
  { month: "Jul", complaints: 52 },
  { month: "Aug", complaints: 48 },
  { month: "Sep", complaints: 61 },
  { month: "Oct", complaints: 55 },
  { month: "Nov", complaints: 38 },
];

export default function AdminDashboard({ onNavigate }) {
  const total = mockComplaints.length;
  const pending = mockComplaints.filter(c => c.status === "Pending").length;
  const resolved = mockComplaints.filter(c => c.status === "Resolved").length;

  const resolvedComplaints = mockComplaints.filter(c => c.status === "Resolved");
  const avgResolutionTime = resolvedComplaints.length
    ? (resolvedComplaints.reduce((acc, c) => acc + c.resolutionTime, 0) / resolvedComplaints.length).toFixed(1)
    : "-";

  const statusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const priorityStyle = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-orange-100 text-orange-700";
      case "Low": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleAssign = (id) => alert(`Complaint #${id} Assigned`);
  const handleResolve = (id) => alert(`Complaint #${id} Resolved`);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of all complaints</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">View Analytics</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Total Complaints" value={total} icon={<FileText size={24} />} />
        <Stat title="Pending" value={pending} icon={<AlertCircle size={24} />} />
        <Stat title="Resolved" value={resolved} icon={<CheckCircle2 size={24} />} />
        <Stat title="Avg Resolution Time" value={`${avgResolutionTime} days`} icon={<Clock size={24} />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Complaints by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Complaint Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="complaints" fill="#1E40AF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <Th>ID</Th>
              <Th>Student</Th>
              <Th>Department</Th>
              <Th>Title</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {mockComplaints.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <Td>#{c.id}</Td>
                <Td>
                  <div className="flex flex-col">
                    <span className="font-medium">{c.studentName}</span>
                    <span className="text-gray-400 text-sm">{c.studentId}</span>
                  </div>
                </Td>
                <Td>{c.department}</Td>
                <Td>{c.title}</Td>
                <Td>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${priorityStyle(c.priority)}`}>
                    {c.priority}
                  </span>
                </Td>
                <Td>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusStyle(c.status)}`}>
                    {c.status}
                  </span>
                </Td>
                <Td>
                  <div className="flex gap-2">
                    <IconBtn icon={<Eye />} onClick={() => onNavigate?.("details", c.id)} />
                    <IconBtn icon={<UserPlus />} onClick={() => handleAssign(c.id)} />
                    <IconBtn icon={<CheckCheck />} onClick={() => handleResolve(c.id)} />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Reusable components */
const Stat = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-lg transition-shadow">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-blue-900">{value}</p>
    </div>
    <div className="text-blue-700">{icon}</div>
  </div>
);

const Th = ({ children }) => <th className="text-left px-4 py-3 text-gray-600">{children}</th>;
const Td = ({ children, className, colSpan }) => <td className={`px-4 py-3 text-gray-700 ${className || ""}`} colSpan={colSpan}>{children}</td>;
const IconBtn = ({ icon, onClick }) => (
  <button onClick={onClick} className="p-2 border rounded hover:bg-gray-100 transition-colors">{icon}</button>
);
