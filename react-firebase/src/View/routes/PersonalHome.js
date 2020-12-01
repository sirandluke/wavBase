import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
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
        name = user.displayName;
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
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
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