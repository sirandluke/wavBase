import React from 'react';

import sine_wave from "../../Images/sine_wave_1.png";

import "./LoadingScreen.css";


const LoadingScreen = () => {
    return (
        <img className="sine_wave" src={sine_wave} alt="Loading..." />
    );
}

export default  LoadingScreen;