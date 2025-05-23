import React, { useState, useEffect } from "react";
import { getAllPatientsForAdmin, deletePatient } from "../api/api"; // API function for fetching and deleting patients
import PatientCard from "./PatientCard";
import "../styles/history.css";

const AdminViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const response = await getAllPatientsForAdmin(); // Fetch patients for admin
      setPatients(response);
    } catch (error) {
      console.error("Failed to fetch patients:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (Id) => {
    if (!Id) {
      console.error("Patient ID is undefined! Check API response.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await deletePatient(Id); // Use 'Id' when calling deletePatient API
      setPatients(patients.filter((patient) => patient.Id !== Id));
    } catch (error) {
      console.error("Failed to delete patient:", error.message);
    }
  };
  
  
  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Admin - View All Patients</h2>
      </div>

      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <div className="grid-container">
          {patients.length > 0 ? (
            patients.map((patient) => (
             <div key={patient.Id} className="patient-card"> {/* Use 'Id' */}
                <PatientCard patientData={patient} />
                <button
                  className="delete-button"
                  onClick={() => handleDeletePatient(patient.Id)} // Use 'Id'
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No patients found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminViewAllPatients;
