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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
