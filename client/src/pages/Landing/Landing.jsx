import React from "react";
import './Landing.css';
import Card from '../../assets/card.png';
import { useNavigate } from "react-router-dom";

function Landing() {
    const navi=useNavigate();
    return (
        <>
            <div className="landing">
                <img src={Card} alt="card" id="card" />
                <button className="landing_btn" onClick={()=>{navi('../login')}}>Explore</button>
            </div>
        </>
    );
}

export default Landing;