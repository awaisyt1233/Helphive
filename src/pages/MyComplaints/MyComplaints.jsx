import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { CiFilter } from "react-icons/ci";

const mockComplaintsData = [
  {
    id: 1,
    title: "Hostel Water Supply Issue",
    category: "Hostel",
    status: "In Progress",
    date: "2025-11-05",
    description: "No water supply in hostel block A",
  },
  {
    id: 2,
    title: "Faculty Not Available",
    category: "Faculty",
    status: "Resolved",
    date: "2025-11-03",
    description: "Dr. Smith not available during office hours",
  },
  {
    id: 3,
    title: "Library AC Not Working",
    category: "Department",
    status: "Pending",
    date: "2025-11-01",
    description: "Air conditioning in library not functional",
  },
  {
    id: 4,
    title: "Cafeteria Food Quality",
    category: "Hostel",
    status: "In Progress",
    date: "2025-11-04",
    description: "Poor quality food being served",
  },
];

export default function MyComplaints() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredComplaints = mockComplaintsData.filter((c) => {
    const search =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    const category =
      selectedCategory === "all" || c.category === selectedCategory;

    const tab =
      activeTab === "all" ||
      c.status.toLowerCase().replace(" ", "-") === activeTab;

    return search && category && tab;
  });

  const statusStyle = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "In Progress") return "bg-blue-100 text-blue-800";
    if (status === "Resolved") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const countByStatus = (status) => {
    if (status === "all") return mockComplaintsData.length;
    return mockComplaintsData.filter(
      (c) => c.status.toLowerCase().replace(" ", "-") === status
    ).length;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">My Complaints</h1>
        <p className="text-gray-600">
          Track and manage all your submitted complaints
        </p>
      </div>

      {/* Filters */}
<div className="bg-white border border-gray-300 rounded-lg p-5 mb-6">
  <div className="flex flex-col md:flex-row gap-4">
    {/* Search */}
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
      <input
        className="w-full bg-gray-100 border border-gray-200 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="Search complaints..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* Category */}
    <div className="relative md:w-48">
      <CiFilter className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <select
        className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Hostel">Hostel</option>
        <option value="Faculty">Faculty</option>
        <option value="Department">Department</option>
        <option value="Infrastructure">Infrastructure</option>
      </select>
    </div>
  </div>
</div>


      {/* Tabs */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg">
        <div className="border-b border-gray-300 px-5 py-3 font-semibold">
          Complaints List
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-22 border-b border-gray-300 bg-gray-200 p-1">
          {["all", "pending", "in-progress", "resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-9 py-2 text-sm transition-all ${
                activeTab === tab
                  ? "bg-white text-black font-semibold rounded-full shadow border border-gray-300"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.replace("-", " ").toUpperCase()} ({countByStatus(tab)})
            </button>
          ))}
        </div>

        {/* Complaints */}
        <div className="p-5 space-y-4">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No complaints found matching your criteria.
            </div>
          ) : (
            filteredComplaints.map((c) => (
              <div
                key={c.id}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className=" text-gray-900">{c.title}</h3>
                    <p className="text-sm text-gray-600">{c.description}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${statusStyle(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-3 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {c.category}
                    </span>
                    <span>{new Date(c.date).toLocaleDateString()}</span>
                  </div>

                  <button className="flex items-center gap-1 text-gray-500 hover:text-black text-sm border border-gray-300 px-3 py-1 rounded-2xl hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-gray-500 " />
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
