import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlyTrends = [
  { month: "Jan", total: 45, resolved: 38, pending: 7 },
  { month: "Feb", total: 52, resolved: 45, pending: 7 },
  { month: "Mar", total: 48, resolved: 42, pending: 6 },
  { month: "Apr", total: 61, resolved: 55, pending: 6 },
  { month: "May", total: 55, resolved: 48, pending: 7 },
  { month: "Jun", total: 67, resolved: 60, pending: 7 },
];

const departmentData = [
  { name: "Computer Science", complaints: 28, color: "#3b82f6" },
  { name: "Electrical Eng", complaints: 22, color: "#10b981" },
  { name: "Mechanical Eng", complaints: 18, color: "#f59e0b" },
  { name: "Civil Eng", complaints: 15, color: "#ef4444" },
  { name: "Other", complaints: 12, color: "#8b5cf6" },
];

const resolutionData = [
  { range: "0-1 day", count: 25 },
  { range: "1-3 days", count: 45 },
  { range: "3-7 days", count: 30 },
  { range: "7+ days", count: 15 },
];

const categoryTrends = [
  { month: "Jan", hostel: 12, faculty: 18, department: 15 },
  { month: "Feb", hostel: 15, faculty: 20, department: 17 },
  { month: "Mar", hostel: 13, faculty: 19, department: 16 },
  { month: "Apr", hostel: 18, faculty: 22, department: 21 },
  { month: "May", hostel: 16, faculty: 21, department: 18 },
  { month: "Jun", hostel: 20, faculty: 25, department: 22 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics & Reports
          </h1>
          <p className="text-gray-600">
            Detailed insights and trends of complaint management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <span className="text-gray-600 font-medium">Resolution Rate</span>
            <span className="text-green-600 text-xl font-bold mt-1">89.5%</span>
            <span className="text-gray-500 text-xs mt-1">
              +5.2% from last month
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <span className="text-gray-600 font-medium">
              Avg Resolution Time
            </span>
            <span className="text-blue-600 text-xl font-bold mt-1">
              2.8 days
            </span>
            <span className="text-gray-500 text-xs mt-1">
              -0.5 days improvement
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <span className="text-gray-600 font-medium">
              Satisfaction Score
            </span>
            <span className="text-yellow-600 text-xl font-bold mt-1">
              4.6 / 5.0
            </span>
            <span className="text-gray-500 text-xs mt-1">
              +0.3 from last month
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <span className="text-gray-600 font-medium">Response Time</span>
            <span className="text-green-600 text-xl font-bold mt-1">
              4.2 hrs
            </span>
            <span className="text-gray-500 text-xs mt-1">
              -1.2 hrs improvement
            </span>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-gray-800 font-semibold mb-2">
              Monthly Complaint Trends
            </h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#1e40af"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-gray-800 font-semibold mb-2">
              Top Departments with Complaints
            </h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    dataKey="complaints"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-gray-800 font-semibold mb-2">
              Resolution Time Distribution
            </h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-gray-800 font-semibold mb-2">
              Category Trends Over Time
            </h2>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={categoryTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="hostel"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                  />
                  <Area
                    type="monotone"
                    dataKey="faculty"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                  />
                  <Area
                    type="monotone"
                    dataKey="department"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="bg-white rounded-xl shadow p-6 mt-8 space-y-4">
        <h2 className="text-gray-900 font-semibold text-lg mb-2">
          Key Insights
        </h2>

        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">
          <h3 className="font-semibold mb-1">Positive Trend</h3>
          <p className="text-sm">
            Resolution rate has improved by 2.4% this month. The maintenance
            team is responding faster to hostel-related complaints.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
          <h3 className="font-semibold mb-1">Attention Required</h3>
          <p className="text-sm">
            Faculty-related complaints have seen a 15% increase. Consider
            conducting a faculty feedback session.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4">
          <h3 className="font-semibold mb-1">Recommendation</h3>
          <p className="text-sm">
            85% of complaints are resolved within 3 days. Consider setting a
            target of 90% for the next quarter.
          </p>
        </div>
      </div>
    </div>
  );
}
