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

    window.onload=function() {
        const resetPW = document.getElementById('resetPW');
        const emailField = document.getElementById('resetPW_input').value;

        const resetPWFunction = (event) => {
            alert('reset func called');
            alert(emailField);
            if (emailField != '') {
                db.auth().sendPasswordResetEmail(emailField)
                    .then(() => {
                        alert('Password Reset Email Sent Successfully!');
                        console.log('Password Reset Email Sent Successfully!');
                    })
                    .catch(error => {
                        console.error(error);
                    })
            } else
                alert('Please enter your email');
        }

        resetPW.addEventListener('click', resetPWFunction);
    }

    return(
        <div>
            <img className="resetPW_logo" src={logo} alt="wavBase Logo" />
            <p className="prompt">Enter your user account’s email and we will send you a password reset link</p>
            <input className="signIn_form" id="resetPW_input" type="text" required="required" placeholder=" Email"></input>
            <button className="button" id="resetPW">Send</button>
        </div>
    );
};

export default ResetPW;