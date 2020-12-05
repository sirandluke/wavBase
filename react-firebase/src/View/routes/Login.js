/*
    Login.js
    TODO: Sign in & reset password with username
    TODO: [RISK] unstable reset password & login functionality
 */
import React, { useContent } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

import db from "../../Model/base";
import "../../App.css";
import * as K from '../../Constants';
import logo from "../../Images/wavBase_logo.png";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import './Login.css';

const Login = ({history}) => {

    const handleLogin = (event) =>
    {
        event.preventDefault();
        const {email_or_username, password} = event.target.elements;

        /*
            TODO: Delegate to db handler?
            Maybe this insert query should be delegated to FirebaseHandler.js
            inorder to better conform to MVC design pattern.
         */
        try {
            if (isEmail(email_or_username.value)) {
                // Login with email and password.
                let email = email_or_username.value;
                db
                    .auth()
                    .signInWithEmailAndPassword(email, password.value);
                history.push("/");
            } else {
                // TODO: Login with username and password.
                let username = email_or_username.value;
                let firebaseRef = db.database().ref("users");
                firebaseRef
                    .orderByChild("username")
                    .equalTo(username)
                    .on("value", function(snapshot){
                        let email = snapshot.child("email").val()
                        db.auth().signInWithEmailAndPassword(email, password.value);
                });
                history.push("/");
                firebaseRef.off();
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-email' || errorCode === 'auth/wrong-password') {
                alert('The email or password you inputted was incorrect. Please try again.');
            } else {
                console.log(errorMessage);
                alert(K.unknown_err);
            }
        }
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

    const redirectRegister = () => {
        history.push("/register");
    }

    window.onload=function() {
        const resetPW = document.getElementById('resetPW');
        const idField = document.getElementById('identity');

        // alert(resetPW);
        const resetPWFunction = () => {
            alert('resetPTFunc called')
            if (isEmail(idField.value)) {
                alert('is email');
                db.auth().sendPasswordResetEmail(idField.value)
                    .then(() => {
                        alert('Password Reset Email Sent Successfully!');
                        console.log('Password Reset Email Sent Successfully!');
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        }

        if (resetPW)
            resetPW.addEventListener('click', resetPWFunction);
    }

    return(
        <div>
            <div className="login_left">
                <img className="login_logo" src={logo} alt="wavBase Logo" width="209" height="187" />
                <hr className="separator"/>
                <p className="login_quote">Collaborate and share with music creators all over the world!</p>
            </div>

            <div className="login_right">
                <h1 className="signIn_header">Sign in to wavBase</h1>
                {/*<h1>{K.app_name}</h1>*/}
                {/*<h2>Login</h2>*/}
                <form onSubmit={handleLogin}>
                    <label>
                        <input
                            className="signIn_form"
                            id="identity"
                            name="email_or_username"
                            type="text"
                            required="required"
                            placeholder=" Username / Email" />
                    </label>
                    <br />
                    <label>
                        <input className="signIn_form" name="password" type="password" required="required" placeholder=" Password" />
                    </label>
                    <br />
                    <button className="button" type="submit">Sign in</button>
                    <br />
                    <button className="button" id="resetPW">Forgot Password / Username?</button>
                    <hr className="separator"/>
                    <button className="signUp_button" onClick={redirectRegister}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;