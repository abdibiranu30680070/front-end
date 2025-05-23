import React from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import SystemAnalytics from "./SystemAnalytics";
import AdminViewAllPatients from "./AdminViewAllPatients";
import PredictionChart from "./PredictionChart"; // Import chart
import Reports from "./Reports"; // Import report download component
import "../styles/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/analytics")}>System Analytics</button>
        <button onClick={() => navigate("/admin/getAllPatientsForAdmin")}>View All Patients</button>
        <button onClick={() => navigate("/admin/reports")}>Download Reports</button> {/* New Button */}
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <main className="admin-content">
        <h1>Admin Dashboard</h1>
        <SystemAnalytics />
        <PredictionChart /> {/* Shows diabetes prediction charts */}
        <Reports /> {/* Provides CSV & Excel report downloads */}
        <UserManagement />
        <AdminViewAllPatients />
      </main>
    </div>
  );
};

export default AdminDashboard;
