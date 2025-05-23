import React, { useState } from "react";
import { downloadCSVReport, downloadExcelReport } from "../api/api";

const Reports = () => {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    prediction: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDownload = async (downloadFunction) => {
    try {
      await downloadFunction(filters.dateFrom, filters.dateTo, filters.prediction);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Download Reports</h2>
      <div style={filterContainerStyle}>
        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleFilterChange}
          style={inputStyle}
        />
        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleFilterChange}
          style={inputStyle}
        />
        <select
          name="prediction"
          value={filters.prediction}
          onChange={handleFilterChange}
          style={selectStyle}
        >
          <option value="">All Predictions</option>
          <option value="diabetic">Diabetic</option>
          <option value="non-diabetic">Non-Diabetic</option>
        </select>
      </div>
      <button
        onClick={() => handleDownload(downloadCSVReport)}
        style={buttonStyle}
      >
        Download CSV
      </button>
      <button
        onClick={() => handleDownload(downloadExcelReport)}
        style={buttonStyle}
      >
        Download Excel
      </button>
    </div>
  );
};

// Styles
const filterContainerStyle = {
  margin: "20px 0",
  display: "flex",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  margin: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default Reports;