import React, { useEffect, useState, useCallback } from "react";
import "../styles/predictionPopup.css";
import { useNavigate } from "react-router-dom";

const PredictionPopup = ({ prediction, percentage, onClose, recommendation, riskLevel }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const handlePopupClose = useCallback(() => {
    onClose();
    navigate("/home");
  }, [onClose, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      handlePopupClose();
    }
  }, [countdown, handlePopupClose]);

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="countdown-timer">
          <span>{countdown}</span>
        </div>
        
        <div className="prediction-header">
          <span className="prediction-result">
            {prediction ? "Diabetic" : "Non Diabetic"}
          </span>
          <span className={`risk-level risk-${riskLevel?.toLowerCase()}`}>
            {riskLevel} Risk
          </span>
        </div>

        <div className="prediction-circle">
          <div className="percentage-circle">
            <span>{(percentage ?? 0).toFixed(2)}%</span>
          </div>
        </div>

        {recommendation && (
          <div className="recommendation-section">
            <h4>Recommendations:</h4>
            <p>{recommendation}</p>
          </div>
        )}

        <button className="close-button" onClick={handlePopupClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PredictionPopup;