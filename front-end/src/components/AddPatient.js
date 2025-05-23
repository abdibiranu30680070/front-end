import React, { useState } from "react";
import { addPatient } from "../api/api";
import "../styles/addPatient.css";
import { useNavigate } from "react-router-dom";
import PredictionPopup from "./PredictionPopup";

const AddPatient = ({ onCloseSidebar }) => {
  const [showPredictionPopup, setShowPredictionPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    name: "",
    age: 0,
    bmi: 0,
    insulin: 0,
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    DiabetesPedigreeFunction: 0.5,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if all required fields are filled
    const requiredFields = [ "age", "bmi", "insulin",  "Glucose", "BloodPressure", "SkinThickness", "DiabetesPedigreeFunction"];
    const missingFields = requiredFields.filter(field => !patientData[field]);
  
    if (missingFields.length > 0) {
      alert(`Please fill out the following fields: ${missingFields.join(", ")}`);
      return;
    }
    setLoading(true);
    try {
      const response = await addPatient(patientData);
      console.log("Full response:", response);
      setPredictionResult({
        prediction: response.prediction,
        precentage: response.precentage,
        riskLevel: response.riskLevel,
        recommendation: response.recommendation
      });
      setShowPredictionPopup(true);
    } catch (error) {
      console.error("Add Patient Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePredictionPopup = () => {
    setShowPredictionPopup(false);
    navigate("/home");
  };
  

  return (
    <div className="container">
      <button className="close-button" onClick={onCloseSidebar}>X</button>
      <div className="add-patient">
        <h2 className="heading">Add Patient</h2>
        <p>Add a new patient and predict their diabetes risk</p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={patientData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>BMI</label>
          <input
            type="number"
            name="bmi"
            value={patientData.bmi}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Insulin</label>
          <input
            type="number"
            name="insulin"
            value={patientData.insulin}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Pregnancies</label>
          <input
            type="number"
            name="Pregnancies"
            value={patientData.Pregnancies}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Glucose</label>
          <input
            type="number"
            name="Glucose"
            value={patientData.Glucose}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Blood Pressure</label>
          <input
            type="number"
            name="BloodPressure"
            value={patientData.BloodPressure}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Skin Thickness</label>
          <input
            type="number"
            name="SkinThickness"
            value={patientData.SkinThickness}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Diabetes Pedigree Function</label>
          <input
            type="number"
            step="0.01"
            name="DiabetesPedigreeFunction"
            value={patientData.DiabetesPedigreeFunction}
            onChange={handleInputChange}
          />
        </div>
        <button className="addButton" type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
      {showPredictionPopup && (
        <PredictionPopup
          prediction={predictionResult?.prediction}
          percentage={predictionResult?.precentage}
          riskLevel={predictionResult?.riskLevel}
          recommendation={predictionResult?.recommendation}
          onClose={handleClosePredictionPopup}
        />
      )}
    </div>
  );
};

export default AddPatient;
