import { useState } from "react";
import { Bell, AlertCircle, Check, Trash2 } from "lucide-react";

export default function Notifications({ onNavigate }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Complaint Status Updated",
      message:
        'Your complaint "Hostel Water Supply Issue" status has been updated to In Progress',
      complaintId: 1,
      read: false,
      timestamp: "2 hours ago",
      type: "status",
    },
    {
      id: 2,
      title: "New Comment",
      message:
        'Admin replied to your complaint "Faculty Not Available During Office Hours"',
      complaintId: 2,
      read: false,
      timestamp: "5 hours ago",
      type: "comment",
    },
    {
      id: 3,
      title: "Complaint Resolved",
      message:
        'Your complaint "Library AC Not Working" has been marked as resolved',
      complaintId: 3,
      read: true,
      timestamp: "1 day ago",
      type: "resolved",
    },
    {
      id: 4,
      title: "Complaint Submitted",
      message:
        'Your complaint "Cafeteria Food Quality" has been successfully submitted',
      complaintId: 4,
      read: true,
      timestamp: "2 days ago",
      type: "success",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.filter((n) => n.read).length;
  const totalCount = notifications.length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Function to return different icon colors based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "status":
        return <Bell className="w-5 h-5 text-blue-600" />;
      case "comment":
        return <Bell className="w-5 h-5 text-purple-600" />;
      case "resolved":
        return <Check className="w-5 h-5 text-green-600" />;
      case "success":
        return <Check className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-blue-900 text-2xl font-bold mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">{unreadCount} unread notifications</p>
        </div>

        {unreadCount > 0 && (
          <button
            className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={markAllAsRead}
          >
            <Check className="w-4 h-4" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Bell className="w-6 h-6 text-gray-600" />
          <div>
            <p className="text-gray-500 text-sm">Total</p>
            <p className="font-bold text-gray-900">{totalCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div>
            <p className="text-gray-500 text-sm">Unread</p>
            <p className="font-bold text-gray-900">{unreadCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Check className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Read</p>
            <p className="font-bold text-gray-900">{readCount}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg mb-6">
        <div className="border-b border-gray-300 px-5 py-3 font-semibold">
          Notifications
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-52 border-b border-gray-300 bg-gray-200 p-1">
          {["all", "unread", "read"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-10 py-2 text-sm transition-all ${
                filter === tab
                  ? "bg-white text-black font-semibold rounded-full shadow border border-gray-300"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.toUpperCase()}
              {tab === "all"
                ? `(${totalCount})`
                : tab === "unread"
                ? `(${unreadCount})`
                : `(${readCount})`}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="p-6 flex flex-col gap-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No notifications found.
            </div>
          ) : (
            notifications
              .filter(
                (n) =>
                  filter === "all" ||
                  (filter === "unread" && !n.read) ||
                  (filter === "read" && n.read)
              )
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 flex items-center gap-4 mb-2 hover:shadow-md transition-shadow ${
                    !notification.read
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      if (notification.complaintId) {
                        setNotifications(
                          notifications.map((n) =>
                            n.id === notification.id ? { ...n, read: true } : n
                          )
                        );
                        onNavigate(
                          "complaint-details",
                          notification.complaintId
                        );
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-gray-900 font-semibold">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {notification.timestamp}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <button
                        className="text-gray-700"
                        title="Mark as read"
                        onClick={() =>
                          setNotifications(
                            notifications.map((n) =>
                              n.id === notification.id
                                ? { ...n, read: true }
                                : n
                            )
                          )
                        }
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="text-red-600"
                      title="Delete"
                      onClick={() =>
                        setNotifications(
                          notifications.filter((n) => n.id !== notification.id)
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4" />
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
