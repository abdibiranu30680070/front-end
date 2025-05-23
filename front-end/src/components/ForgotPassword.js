import React, { useState } from "react";
import { requestPasswordReset } from "../api/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            // Validate email format
            // Replace validator.isEmail(email) with:
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                setError("Please enter a valid email address");
                return;
            }

            // Store email for potential reset token use
            localStorage.setItem("resetEmail", email);

            const response = await requestPasswordReset(email);
            
            // Handle development mode display
            if (process.env.NODE_ENV === "development" && response.resetToken) {
                setMessage(`Development Mode - Use this token: ${response.resetToken}`);
                console.log("Reset Token:", response.resetToken);
            } else {
                setMessage(response.message || "Password reset instructions sent to your email");
            }

        } catch (error) {
            console.error("Password reset error:", error);
            setError(error.message || "Failed to send reset instructions");
        }
    };

    return (
        <div className="center">
            <h2>Forgot Password</h2>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your registered email"
                    />
                    <span></span>
                    <label>Email</label>
                </div>
                <button type="submit" className="submit-btn">
                    Send Reset Instructions
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;