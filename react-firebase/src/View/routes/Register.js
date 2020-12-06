/*
    Register.js
 */
import React from 'react';
import db from "../../Database_config";
import "../../App.css";
import * as K from "../../Constants";
import logo from "../../Images/wavBase_logo.png";
import './Register.css'
import * as FirebaseHandler from "../../model/FirebaseHandler.js";

const Register = ({ history }) => {

    const handleRegister = (event) => {
        event.preventDefault();

        // Returns HTML elements from register form
        const {
            username,
            email,
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
                FirebaseHandler.createUser(username.value, password.value, email.value);
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
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
                <button className="signIn_btn" type="submit" onClick={redirectLogIn}>Sign In</button>
                <form className="search_bar">
                    <input className="search_input" className="type_box" type="text" placeholder=" Search"
                           name="search"/>
                    <button type="submit" ><i className="fa fa-search"></i></button>
                </form>

            </div>
            {/*<h1>{K.app_name}</h1>*/}
            {/*<h2>Register an Account</h2>*/}
            <div className="register_left">
                <form className="register_form" onSubmit={handleRegister}>
                    <label>
                        Username <br/>
                        <input className="register_input" name="username" type="text" required="required" placeholder="Username"/>
                    </label>
                    <br/>
                    <label>
                        Email <br/>
                        <input className="register_input" name="email" type="email" required="required" placeholder="Email"/>
                    </label>
                    < br/>
                    <label>
                        Password <br/>
                        <input className="register_input" name="password" type="password" required="required" placeholder="Password"/>
                    </label>
                    <br/>
                    <label>
                        Re-enter Password <br/>
                        <input className="register_input" name="verify" type="password" required="required" placeholder="Re-enter Password"/>
                    </label>
                    <br/>
                    <button className="register_button" type="submit">Sign up for wavBase</button>
                </form>
            </div>

            <div className="upperRight_text">
                <h1>Built for music creators</h1>
                <p1>
                    wavBase is a development platform designed for music
                    producers. From open source to collaboration, you can
                    collaborate with others, manage projects, and share
                    your work to millions of music listeners.
                </p1>
            </div>

            <div className="lowerRight_text">
                <h2>Get started with wavBase </h2>
                <p2>Collaborate on a whole new level</p2>
            </div>

            <svg className="wave_shape" transform="translate(0,125)" width="100%" height="233" viewBox="0 0 1440 233" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M436 33.0881C278.129 -126.817 -112.5 358.5 -112.5 358.5L1480.5 312.088C1480.5 312.088 1365.53 -27.3911 1103.5 113.588C841.466 254.567 593.871 192.993 436 33.0881Z" fill="#00A3E7" stroke="#00A3E7"/>
            </svg>

            {/*<button className="link_button" onClick={redirectLogIn}>Already have an account?</button>*/}
            <div className="footer">
                <p className="company">© 2020 wavBase Inc.</p>
                <div className="social_media">
                    <a href="#" className="fa fa-facebook fa-2x"></a>
                    <a href="#" className="fa fa-twitter fa-2x"></a>
                </div>
            </div>
        </div>

    );
};

export default Register;