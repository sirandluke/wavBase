/*
    Login.js
    TODO: Sign in with username
 */
import React, { useContent } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

import db from "../../Model/base";
import "../../App.css";
import * as K from '../../Constants';
import logo from "../../Images/wavBase_logo.png";
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
            if (isEmail(email_or_username)) {
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

    return(
        <div className="centered">
            <img src={logo} alt="wavBase Logo" width="100" height="100" />
            <h1>{K.app_name}</h1>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    <input
                        name="email_or_username"
                        type="text"
                        required="required"
                        placeholder="Enter your email or username" />
                </label>
                <br />
                <label>
                    <input name="password" type="password" required="required" placeholder="Password" />
                </label>
                <br />
                <button class="login_button" type="submit">Login</button>
                <br />
                 <button class="link_button" onClick={redirectRegister}>Don't have an account?</button>
            </form>
        </div>
    );
};

export default Login;