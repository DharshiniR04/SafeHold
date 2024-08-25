import React, { useState } from "react";
import './Home.css';
import Logo from '../../assets/safehold-logo.png';
import Transaction from "../Transaction/Transaction";
import History from "../History/History";
import { FaSignOutAlt } from 'react-icons/fa';
import { SelectedUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const [activeTab, setActiveTab] = useState("transaction");
    const navi=useNavigate();
    const{setUserDetail,userDetail}=SelectedUser();

    const handleLogout=async()=>{
        setUserDetail("");
        navi("../");
    }

    return (
        <div className="home">
            <div className="home-navbar">
                <img src={Logo} className="logo" alt="event-logo" />
                <FaSignOutAlt className="logout-icon" onClick={handleLogout}/>
            </div>
            <div className="home-welcome">
                <div className="home-welcome-box">
                    <h2>Welcome Back, {userDetail.name} </h2>
                    <p>Your Balance: Rs.{userDetail.amount}</p>
                </div>
            </div>
            <div className="home-tabs">
                <button 
                    className={`home-tab ${activeTab === "transaction" ? "active" : ""}`} 
                    onClick={() => setActiveTab("transaction")}
                >
                    Transaction
                </button>
                <button 
                    className={`home-tab ${activeTab === "history" ? "active" : ""}`} 
                    onClick={() => setActiveTab("history")}
                >
                    History
                </button>
            </div>
            <div className="home-content">
                {activeTab === "transaction" && <Transaction />}
                {activeTab === "history" && <History />}
            </div>
        </div>
    );
}

export default Home;
