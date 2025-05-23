import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import PageNotFound from './components/PageNotFound';
import AdminDashboard from "./pages/AdminDashboard";
import AdminViewAllPatients from "./components/AdminViewAllPatients";
import UserManagement from './components/UserManagement';
import PatientDetails from './components/PatientDetails';
import SystemAnalytics from './components/SystemAnalytics';
import Reports from "./components/Reports";  // Import Reports page
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          
          {/* 🟢 Admin Dashboard Routes */}
          <Route path="/AdminDashboards" element={<AdminDashboard />} />  {/* Fixed Typo */}
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/getAllPatientsForAdmin" element={<AdminViewAllPatients />} />
          <Route path="/admin/analytics" element={<SystemAnalytics />} />
          <Route path="/admin/reports" element={<Reports />} />  {/* New Reports Page */}

          {/* 🟢 Authentication Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* 🟢 Patient Routes */}
          <Route path="/patient/:patientId" element={<PatientDetails />} />

          <Route path="/login" element={<LoginPage />} />  {/* Removed Duplicate Login Route */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
