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

const Login = ({history}) => {

    const handleLogin = (event) => {
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
                    .signInWithEmailAndPassword(email, password.value).then(user => {
                    console.log(user.user.uid);
                });
            } else {
                // TODO: Login with username and password.
                let username = email_or_username.value;
                let firebaseRef = db.database().ref("users");
                firebaseRef
                    .orderByChild("username")
                    .equalTo(username)
                    .on("value", function (snapshot) {
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

    const redirectRegister = () => {
        history.push("/register");
    }

    const redirectReset = () => {
        history.push("/reset_password");
    }

    return (
        <div>
            <div className="login_left">
                <img className="login_logo" src={logo} alt="wavBase Logo" width="209" height="187"/>
                <hr className="separator"/>
                <p className="login_quote">Collaborate and share with music creators all over the world!</p>
            </div>

            <div className="login_right">
                <h1 className="signIn_header">Sign in to wavBase</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        <input
                            className="signIn_form"
                            id="identity"
                            name="email_or_username"
                            type="text"
                            required="required"
                            placeholder=" Username / Email"/>
                    </label>
                    <br/>
                    <label>
                        <input className="signIn_form" name="password" type="password" required="required"
                               placeholder=" Password"/>
                    </label>
                    <br/>
                    <button className="button" type="submit">Sign in</button>
                    <br/>
                    <button className="button" id="resetPW" onClick={redirectReset}>Forgot Password / Username?</button>
                    <hr className="separator"/>
                    <button className="signUp_button" onClick={redirectRegister}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;