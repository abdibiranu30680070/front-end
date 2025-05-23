import React, { useState } from "react";
import AddPatient from "./AddPatient";
import ViewAllPatients from "./ViewHistory";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Redirect admin users to admin dashboard
  if (userRole === "admin") {
    navigate("/admin/dashboard");
    return null;
  }

  return (
    <div className="home-container">
      <div className="content-container">
        <div className="buttons-container">
          <button
            onClick={() =>
              setActiveComponent(activeComponent === "addPatient" ? null : "addPatient")
            }
          >
            {activeComponent === "addPatient" ? "Close Add Patient" : "Add Patient"}
          </button>

          <button
            onClick={() =>
              setActiveComponent(activeComponent === "viewHistory" ? null : "viewHistory")
            }
          >
            {activeComponent === "viewHistory" ? "Close Browse History" : "Browse History"}
          </button>

          <button onClick={handleLogout}>Logout</button>
        </div>

        {/* Conditionally render only one component at a time */}
        {activeComponent === "addPatient" && (
          <AddPatient onClose={() => setActiveComponent(null)} />
        )}

        {activeComponent === "viewHistory" && (
          <ViewAllPatients onClose={() => setActiveComponent(null)} />
        )}
      </div>
    </div>
  );
};

export default Home;
