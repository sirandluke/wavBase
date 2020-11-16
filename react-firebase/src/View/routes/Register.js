/*
    Register.js
 */
import React from 'react';
import db from "../../Model/base";
import "../../App.css";
import * as K from "../../Constants";
import logo from "../../Images/wavBase_logo.png";
import './Register.css'
const Register = ({ history }) => {

    const handleRegister = (event) => {
        event.preventDefault();
        const {
            username,
            email,
            password,
            verify,  // Verification for password.
        } = event.target.elements;
        console.log("Adding user");
        /*
            TODO: Delegate to db handler?
            Maybe this insert query should be delegated to FirebaseHandler.js
            inorder to better conform to MVC design pattern.
         */
        console.log(password.value + "|" + verify.value);
        if (password.value === verify.value) {
            console.log("Password verified.");
            try {
                db
                    .auth()
                    .createUserWithEmailAndPassword(
                        email.value,
                        password.value
                    );
                db.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        db.database().ref('users/' + user.uid).set({
                            username: username.value,
                            email: email.value,
                            biography: K.empty,
                            profile_picture: K.empty,
                            followers: K.empty,
                            following: K.empty,
                        });
                    }
                });
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