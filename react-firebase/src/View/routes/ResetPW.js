/*
    ResetPW.js
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

const ResetPW = ({history}) => {

        const resetPW = (event) => {
            const resetPW = document.getElementById('resetPW');
            const emailField = document.getElementById('resetPW_input').value;
            if (emailField != '') {
                db.auth().sendPasswordResetEmail(emailField)
                    .then(() => {
                        console.log('Password Reset Email Sent Successfully!');
                        history.push("/reset_password_success");
                    })
                    .catch(error => {
                        console.error(error);
                        alert('Please enter the correct email');
                    })
            } else
                alert('Please enter your email');
        }

    return(
        <div>
            <img className="resetPW_logo" src={logo} alt="wavBase Logo" />
            <p className="prompt">Enter your user account’s email and we will send you a password reset link</p>
            <input id="resetPW_input" type="text" required="required" placeholder=" Email"></input>
            <button className="button" id="resetPW" onClick={resetPW}>Send</button>
        </div>
    );
};

export default ResetPW;