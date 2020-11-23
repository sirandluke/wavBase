/*
    Register.js
 */
import React from 'react';
import db from "../../Model/base";
import "../../App.css";
import * as K from "../../Constants";
import logo from "../../Images/wavBase_logo.png";
import './Register.css'
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";

const Register = ({ history }) => {

    const handleRegister = (event) => {
        event.preventDefault();

        // Returns HTML elements from register form
        const {
            username,
            email,
            first_name,
            last_name,
            password,
            verify,  // Verification for password.
        } = event.target.elements;

        console.log("Adding user");
        console.log(password.value + "|" + verify.value);

        // Verifies if user correctly re-entered password when registering
        if (password.value === verify.value) {
            console.log("Password verified.");

            try {
                // Creates user via FirebaseHandler using returned element values
                FirebaseHandler.createUser(username.value, password.value, email.value, first_name.value, last_name.value);
                history.push("/");
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak! Please Try a different one.');
                } else if (errorCode === 'auth/email-already-in-use') {
                    alert('An account already exists with this email!')
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Please enter a valid email address!');
                } else {
                    console.log(errorMessage);
                    alert(K.unknown_err);
                }
            }
        } else {
            alert("Please make sure your password matches!");
        }
    }

    const redirectLogIn = () => {
        history.push("/");
    }

    return(
        <div className="centered">
            <img src={logo} alt="wavBase Logo" width="100" height="100" />
            <h1>{K.app_name}</h1>
            <h2>Register an Account</h2>
            <form onSubmit={handleRegister}>
                <label>
                    First Name <br/>
                    <input name="first_name" type="text" required="required" placeholder="First Name" />
                </label>
                <br />
                <label>
                    Last Name <br/>
                    <input name="last_name" type="text" required="required" placeholder="Last Name" />
                </label>
                <br />
                <label>
                    Username <br/>
                    <input name="username" type="text" required="required" placeholder="Username" />
                </label>
                <br />
                <label>
                    Email <br/>
                    <input name="email" type="email" required="required" placeholder="Email" />
                </label>
                < br />
                <label>
                    Password <br/>
                    <input name="password" type="password" required="required" placeholder="Password" />
                </label>
                <br />
                <label>
                    Re-enter Password <br/>
                    <input name="verify" type="password" required="required" placeholder="Re-enter Password" />
                </label>
                <br />
                <button class="register_button" type="submit">Register</button>
            </form>
            <button class="link_button" onClick={redirectLogIn}>Already have an account?</button>
        </div>
    );
};

export default Register;