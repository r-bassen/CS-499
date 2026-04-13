// reference: https://www.npmjs.com/package/react-social-login-buttons?activeTab=readme
// React component - Login page
// Project code modified from the CS - 465 template and my final project(2025)

// import React, useState, useNavigate, and authServices
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {authServices} from "../services/authServices";

// reference: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#step-1-building-a-login-page

// login page component
export default function Login() {
// instantiate variables for the login form
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // login submission handler
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        // call authentication service 
        try {
            await authServices.login(email, password);
            console.log("Token stored?", localStorage.getItem('accessToken'));
            navigate("/survey", {replace: true});     // login loads survey page

        } catch (authError) {   // invalid login handler
            setError("Invalid email or password. Please try again")
            console.error("Login error: ", authError);
        }
    };


    // return the login page container
    return (
        <div className = "login-page">
        <div className="login-wrapper">
        <h1>Faculty Survey Portal</h1>
        <p>Please login to view and submit the WNC-NFA faculty survey.</p>

        {/* Error alert */}
        {error && (
            <div className = "error-alert">
            {error}
            </div>
        )}

        {/* Load the login form */}
        <form onSubmit = {handleLoginSubmit} className ="login-form">
            <div className = "form-group">
            {/* id the email input on form */}
            <label htmlFor="email">Email:</label>
                <input 
                type="email"
                id = "email"
                value = {email}
                onChange = {(event) => setEmail(event.target.value)}
                required
                placeholder = "faculty@wnc-nfa.edu" /> {/* placeholder entry */}
            </div>
            
            {/* id the password input on form */}
            <div className = "form-group">
                <label htmlFor="password">Password:</label>
                <input type="password"
                id = "password"
                value = {password}
                onChange = {(event) => setPassword(event.target.value)}
                required
                placeholder = "Enter your password"/> {/* placeholder entry */}
            </div>
            
            {/* login submit button logic */}
            <button type="submit"
            className="login-submit-btn">Login</button>

        </form>

        {/* demo login credentials */}
        <div className = "login-footer">
            <p>Demo credentials:</p>
            <p className = "demo-creds">Email: faculty@wnc-nfa.edu</p>
            <p className = "demo-creds">Password: password123</p>
        </div>
        </div>
        </div>
  );
};





