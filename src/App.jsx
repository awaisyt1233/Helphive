import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/Layout";
import Home from "./pages/Home/home";
import Sidebar from "./components/Sidebar/Sidebar";
import MyComplaints from "./pages/MyComplaints/MyComplaints";
import Complaintform from "./pages/Complaintform/Complaintform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout sidebar={<Sidebar />} />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/submit-complaint" element={<Complaintform />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
