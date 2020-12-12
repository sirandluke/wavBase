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
import sine_wave_1 from "../../Images/sine_wave_1.png";
import {CreateUser} from "../../BackendFunctions";


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
                CreateUser(username.value, password.value, email.value);
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
        //history.push("/");
        history.push("/login");
    }

    const signInPrompt = () => {
        alert('Please register or sign in your account :)');
    }

    return(
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
                <button className="signIn_btn" type="submit" onClick={redirectLogIn}>Sign In</button>
                <form onSubmit={signInPrompt} className="search_bar">
                    <input className="search_input" type="text" placeholder=" Search"
                           name="search"/>
                    <button type="submit" className="search_btn"><i className="fa fa-search"></i></button>
                </form>
            </div>

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
                <h1 id="bold">Built for <br/> music creators</h1>
                <p1>
                    wavBase is a development platform designed for <span className="bold_text">music producers</span>. From open source to collaboration, you can <span className="bold_text">collaborate</span> with others, <span className="bold_text">manage projects</span>, and <span className='bold_text'>share</span> your work to millions of music listeners.
                </p1>
            </div>
            <img src={sine_wave_1} className={"bottom_wave"} style={{width:"100%", height:"233", bottom:"-3rem", zIndex:"-99", position:"absolute"}}/>
        </div>

    );
};

export default Register;