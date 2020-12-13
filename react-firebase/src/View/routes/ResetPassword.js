/*
    SignIn.js
    TODO: Sign in & reset password with username
    TODO: [RISK] unstable reset password & login functionality
 */
import React, {useContent, useContext} from "react";
import {Redirect} from "react-router-dom";
import {AuthContext} from "../auth/Auth";

import db from "../../Model/base";
import "../../App.css";
import * as K from '../../Constants';
import logo from "../../Images/wavBase_logo.png";
import * as FirebaseHandler from "../../Model/FirebaseHandler.js";
import './Login.css';
import {SignIn} from "../../BackendFunctions";

const ResetPassword = ({history}) => {

    const {currentUser} = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/"/>;
    }

    /*
        Check's if user input is an email address.
        @input: s -> String
        @output: bool
     */
    function isEmail(s) {
        const exp = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        return exp.test(s);
    }

    const redirectLogin = () => {
        history.push("/login");
    }

    const resetPWFunction = () => {
        const idField = document.getElementById('identity');
        
        if (isEmail(idField.value)) {
            console.log("Email parsed: " + idField.value);
            db.auth().sendPasswordResetEmail(idField.value)
                .then(() => {
                    alert('Password Reset Email Sent Successfully!');
                    console.log('Password Reset Email Sent Successfully!');
                })
                .catch(error => {
                    alert('Invalid Email');
                    console.error(error);
                })
        }

        history.push("/login");
    }

    return (
        <div>
            <div className="login_left">
                <img className="login_logo" src={logo} alt="wavBase Logo" width="209" height="187"/>
                <hr className="separator"/>
                <p className="login_quote">Collaborate and share with music creators all over the world!</p>
            </div>

            <div className="login_right">
                <h1 className="signIn_header">Account Recovery</h1>
                <form onSubmit={resetPWFunction}>
                    <label>
                        <input
                            className="signIn_form"
                            id="identity"
                            name="email_or_username"
                            type="text"
                            required="required"
                            placeholder=" Email"/>
                    </label>
                    <br/>
                    <button className="button" type="submit">Confirm</button>
                    <br/>
                    <button className="button" onClick={redirectLogin}>Go Back</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;