import React from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
//import Home from "./Home";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";

// TODO: render searchbar, likes, (add more)
const PersonalHome = ({history}) => {

    let user = db.auth().currentUser;
    //let name, email, photoUrl, uid, emailVerified;
    let name = "YYY";
    if (user != null) {
        name = user.email;
    }

    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    const redirectRepo = () => {
        history.push("/repository");
    }


    return (
        <div className="container">
            <h1>Home</h1>
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50" />
                <h2>Hello {name}</h2>
                <ul>
                    <button onClick={redirectCreateRepo}>Create Repository</button>
                    <button onClick={redirectRepo}>TestRepositories</button>
                    <li>Repositories</li>
                    <li>Likes</li>
                    <button onClick={() => db.auth().signOut()}>Sign Out</button>
                </ul>
            </div>
        </div>
    );
}

export default PersonalHome;