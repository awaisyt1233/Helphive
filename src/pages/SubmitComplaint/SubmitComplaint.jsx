import { useState } from "react";
import { Upload } from "lucide-react";

export default function SubmitComplaint() {
  const [complaintData, setComplaintData] = useState({
    title: "",
    category: "",
    description: "",
    file: null,
  });

  const handleFileChange = (e) => {
    setComplaintData({ ...complaintData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!complaintData.title || !complaintData.category || !complaintData.description) {
      alert("Please fill all required fields (*)");
      return;
    }

    console.log(complaintData);
    // Add your API call or logic here
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Submit New Complaint</h1>
        <p className="text-gray-600 mt-1">
          Fill out the form below to submit your complaint
        </p>
      </div>

      {/* Complaint Form */}
      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Complaint Details</h2>
        <p className="text-gray-500 text-sm">
          Provide detailed information about your complaint for faster resolution
        </p>

        {/* Title */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={complaintData.title}
            placeholder="Brief description of the Issue"
            onChange={(e) => setComplaintData({ ...complaintData, title: e.target.value })}
            className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition border-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1 mb-2">
            Select complaint category <span className="text-red-500">*</span>
          </label>
          <select
            value={complaintData.category}
            onChange={(e) => setComplaintData({ ...complaintData, category: e.target.value })}
            className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition border-none"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-1 mb-2">
            Detailed description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={complaintData.description}
            onChange={(e) => setComplaintData({ ...complaintData, description: e.target.value })}
            maxLength={1000}
            rows={5}
            placeholder="Provide detailed information about your complaint..."
            className="w-full px-3 py-2 bg-gray-100 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-700 transition border-none"
            required
          />
          <p className="text-gray-400 text-xs mt-1">
            {complaintData.description.length}/1000 characters
          </p>
        </div>

        {/* File Upload */}
        <div>
          <label className="text-md font-semibold flex items-center gap-2 mb-2">
            Attachment (optional)
          </label>
          <label className="w-full border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition">
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-500 text-center text-sm">
              Click to upload file
              <br />
              PNG, JPG, PDF, DOC (max 10MB)
            </span>
            <input
              type="file"
              accept=".png,.jpg,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {complaintData.file && (
            <p className="text-gray-700 text-sm mt-1">Selected file: {complaintData.file.name}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Submit Complaint
          </button>
          <button
            onClick={() => setComplaintData({ title: "", category: "", description: "", file: null })}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
