import React, { useState,useEffect } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LoginBg from '../../assets/SafeHold_bg.png';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { SelectedUser } from "../../context/userContext";

function Login() {
    const navi = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { setUserDetail ,userDetail} = SelectedUser();

    useEffect(() => {
            console.log("User details updated:", userDetail);
    }, [userDetail]);

    const fetchUserDetail = async (email) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/userdetail", { email });
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            
            if (response.data.message === "Login successful") {
                const user = await fetchUserDetail(email);
                setUserDetail(user);
                if (userDetail) {
                    alert("Login successfully");
                    navi('../home');
                }
            } else if (response.data.message === "User does not exist") {
                setError("User does not exist");
            } else if (response.data.message === "Invalid credentials") {
                setError("Invalid credentials");
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError("An error occurred during login");
        }
    };

    return (
        <div className="login">
            <div className="login_1">
                <img src={LoginBg} alt="Login Background" id="log_img" />
            </div>
            <div className="login-content">
                <FaArrowLeft className="back-arrow" onClick={() => navi('../')} />
                <h2 className="login-content-head">Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <div className="input-container">
                            <input type="email" id="email" name="email" className="solid-input" placeholder="Email" required />
                        </div>
                        <div className="input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="solid-input"
                                placeholder="Password"
                                required
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error && <p id="errorTag" className="error-message">{error}</p>}
                        <button className="login-btn" type="submit">Login</button>
                    </div>
                </form>
                <p className="want">Don't have an account? <span style={{ cursor: 'pointer', color: '#16181c', fontWeight: 'bold' }} onClick={() => navi('/signup')}>Signup</span></p>
            </div>
        </div>
    );
}

export default Login;
