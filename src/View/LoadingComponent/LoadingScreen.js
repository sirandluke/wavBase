import React from 'react';

import sine_wave from "../../Images/sine_wave_1.png";

import loading_icon from "../../Images/loader.gif"

import "./LoadingScreen.css";


const LoadingScreen = (props) => {

    return (
        <div>
            <div className="load_text">
                <h3 className="loading_msg" data-text={props.message}>
                    <img className="loading_icon" src={loading_icon} alt="Loading..." height="35" width="35"/>
                    {props.message}
                </h3>
            </div>
        </div>

    );
}

export default  LoadingScreen;