import React, { useState } from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is "user"
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await signup(formData);
      console.log("Signup Successful:", response);
      navigate("/"); // Redirect to login page after signup
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <div className="center">
      <h1>Signup</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} method="post">
        <div className="txt_field">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <span></span>
          <label>Name</label>
        </div>
        <div className="txt_field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        

        <input type="submit" value="Signup" />

        <div className="signup_link"> 
          I have an account <a href="/">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
