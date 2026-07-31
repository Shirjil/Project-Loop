import React, { useState } from "react";
import "./../styles/Login.css";
import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
} from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page">

            {/* Background Effects */}
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>

            {/* Login Card */}
            <div className="container-box">

                {/* LEFT PANEL */}

                <div className="left-panel">

                    <h1>PROJECT LOOP</h1>

                    <h3>
                        AI Powered Customer Feedback Analysis Platform
                    </h3>

                    <p className="description">
                        Transform customer opinions into meaningful business insights using
                        Artificial Intelligence, Sentiment Analysis and Interactive Analytics.
                    </p>

                    <div className="features">

                        <div className="feature">
                            📊 Real-Time Dashboard
                        </div>

                        <div className="feature">
                            🤖 AI Sentiment Analysis
                        </div>

                        <div className="feature">
                            📈 Business Intelligence
                        </div>

                        <div className="feature">
                            📄 PDF & Excel Reports
                        </div>

                        <div className="feature">
                            🔒 Enterprise Security
                        </div>

                    </div>

                    <div className="status-container">

                        <div className="status-card">
                            <span className="status-dot green"></span>
                            Backend Online
                        </div>

                        <div className="status-card">
                            <span className="status-dot blue"></span>
                            PostgreSQL Connected
                        </div>

                        <div className="status-card">
                            <span className="status-dot orange"></span>
                            AI Engine Active
                        </div>

                    </div>

                    <div className="version">

                        Project LOOP v1.0

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="login-card">

                {/* Logo */}
                <div className="logo-section">

                    <div className="logo-circle">
                        PL
                    </div>

                    <h1>PROJECT LOOP</h1>

                    <p>
                        AI Powered Customer Feedback Analysis Platform
                    </p>

                </div>

                {/* Welcome */}
                <div className="welcome">

                    <h2>Welcome Back 👋</h2>

                    <p>
                        Sign in to continue to your dashboard
                    </p>

                </div>

                {/* Login Form */}

                <form>

                    {/* Username */}

                    <div className="input-box">

                        <FaUser className="icon"/>

                        <input
                            type="text"
                            placeholder="Username or Email"
                        />

                    </div>

                    {/* Password */}

                    <div className="input-box">

                        <FaLock className="icon"/>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />

                        <span
                            className="eye"
                            onClick={() => setShowPassword(!showPassword)}
                        >
              {
                  showPassword
                      ? <FaEyeSlash/>
                      : <FaEye/>
              }
            </span>

                    </div>

                    <div className="options">

                        <label>

                            <input type="checkbox"/>

                            Remember Me

                        </label>

                        <a href="#">Forgot Password?</a>

                    </div>

                    <button className="login-btn">

                        LOGIN

                    </button>

                </form>

                <div className="footer">

                    <FaShieldAlt/>

                    <span>

            Protected by Enterprise Security • AI Powered Platform

          </span>

                </div>

                </div>

            </div>

        </div>

    );
};

export default Login;