import React, { useState } from "react";
import { login } from "../api/api";
import "../styles/login.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To handle error messages

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error before each submission

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await login(formData);
      console.log("Login Response:", response); // Debugging
  
      if (!response.token) {
        console.error("No token received, login failed.");
        setError("Invalid credentials. Please try again.");
        return;
      }
  
      localStorage.setItem("token", response.token);
  
      // Decode the token to extract role
      const decodedToken = JSON.parse(atob(response.token.split(".")[1]));
      console.log("Decoded Token:", decodedToken); // Debugging
  
      localStorage.setItem("role", decodedToken.role); // Store the role in localStorage
  
      // Redirect based on role
      if (decodedToken.role === "admin") {
        navigate("/AdminDashboards");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} method="post">
        {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
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
        <div className="pass">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <input type="submit" value="Login" />
        <div className="signup_link">
          Create Account <a href="/signup">Signup</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
