import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/Layout";
import Home from "./pages/Home/home";
import Sidebar from "./components/Sidebar/Sidebar";
import MyComplaints from "./pages/MyComplaints/MyComplaints";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import SubmitComplaint from "./pages/SubmitComplaint/SubmitComplaint";
import Notifications from "./pages/Notification/Notification";
import AdminLayout from "./Admin/Components/Layout";
import AdminSidebar from "./Admin/Components/Sidebar";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import Analytics from "./Admin/Pages/Analytics";
import ManageUsers from "./Admin/Pages/ManageUsers";
import Notification from "./Admin/Pages/Notifications";
import AdminProfile from "./Admin/Pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout sidebar={<Sidebar />} />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<AdminLayout sidebar={<AdminSidebar />} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/notifications" element={<Notification />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
