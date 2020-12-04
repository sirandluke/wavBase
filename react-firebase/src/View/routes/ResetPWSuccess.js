/*
    ResetPWSuccess.js
 */
import React, { useContent } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

import db from "../../Model/base";
import "../../App.css";
import * as K from '../../Constants';
import logo from "../../Images/wavBase_logo.png";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import './ResetPW.css';

const ResetPWSuccess = ({history}) => {

    const redirectLogin = () => {
        history.push("/login");
    }

    return(
        <div>
            <img className="resetPW_logo" src={logo} alt="wavBase Logo" />
            <p className="prompt">Your password reset email has been sent!</p>
            <p className="prompt">Please check your inbox to continue</p>
            <button id="toSignInPage" onClick={redirectLogin}>Click here to sign in</button>
        </div>
    );
};

export default ResetPWSuccess;