const express = require("express");
const dotenv = require("dotenv"); 
const cors = require("cors");
const path = require("path");
dotenv.config(); 

const connectDB = require("./utils/db");
const userRoutes = require("./Routers/userRoutes");
const complaintRoutes = require("./Routers/complaintRoutes");
const adminRoutes = require("./Routers/adminRoutes");
const analyticsRoutes = require("./Routers/analyticsRoutes");
const adminUserRoutes = require("./Routers/AdminUserRoutes");
const FacultyRoutes = require("./Routers/facRoutes");
const adminDashboardRoutes = require("./Routers/adminDashboardRoutes");
const notificationRoutes = require("./Routers/notificationRoutes");

const app = express();


const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    credentials: true,
  }
));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/complaints", complaintRoutes);


//Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/users/security", adminUserRoutes);
app.use("/api/faculty/", FacultyRoutes);
app.use("/api/admin-dashboard", adminDashboardRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running securely! 🔒");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
