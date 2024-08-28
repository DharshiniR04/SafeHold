import React, { useState } from "react";
import './Signup.css';
import { useNavigate } from "react-router-dom";
import LoginBg from '../../assets/SafeHold_bg.png';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import axios from "axios";
import Modal from "../../components/Modal/Modal";

function Signup() {
    const navi = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
        navi('../login');
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const errorTag = document.getElementById("errorTag");
        const data = {
            name: e.target.elements.name.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", { name: data.name, email: data.email, password: data.password });
            if (response.data.message === "User already exists") {
                errorTag.textContent = "User already exists";
            }
            else if (response.data.message === "User created successfully") {
                setModalMessage("User created successfully");
                setIsModalOpen(true);
                setTimeout(() => {
                    closeModal(); 
                }, 1500);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
            <div className="signup">
                <div className="signup_1">
                    <img src={LoginBg} alt="Login Background" id="log_img" />
                </div>
                <div className="signup-content">
                    <FaArrowLeft className="back-arrow" onClick={() => { navi('../') }} />
                    <h2 className="signup-content-head">Time to feel secure,</h2>
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <div className="input-container">
                                <input type="text" id="name" name="name" className="solid-input" placeholder="Name" required />
                            </div>
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
                                <span className="signup-password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p id="errorTag"></p>
                            <button className="signup-btn" type="submit">Signup</button>
                        </div>
                    </form>
                    <p className="want">Already have an account? <span style={{ cursor: 'pointer', color: '#16181c', fontWeight: 'bold' }} onClick={() => navi('/login')}>Login</span></p>
                </div>
            </div>
        </>
    );
}

export default Signup;
