import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
//import Home from "./Home";
import * as FirebaseHandler from "../../Model/FirebaseHandler.js";
import ResultsInterface from "./ResultsInterface";
import PrivateRoute from "../auth/PrivateRoute";

export let search_input = '';

// TODO: render searchbar, likes, (add more)
const PersonalHome = ({history}) => {

    let user = db.auth().currentUser;
    //let name, email, photoUrl, uid, emailVerified;
    let name = "YYY";
    if (user != null) {
        //name = user.email;
        let username;
        let uid = db.auth().currentUser.uid;
        let firebaseRef = db.database().ref('users/' + uid);
        firebaseRef.on('value', (snapshot) => {
            username = snapshot.val().username;
        })
        name = username;
    }


    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    const handleSearch = () => {
        search_input = document.getElementById('search_input').value;
        history.push("/search_result");
    }

    return (
        <div className="container">
            <h1>Home</h1>
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50"/>
                {/*Search Bar Begin */}
                <form onSubmit={handleSearch}>
                    <label>
                        <input id='search_input' type="text" name="query"></input>
                    </label>
                    <button type="submit">Search</button>
                </form>
                {/*Search Bar End */}
                <h2>Hello {name}</h2>
                <DropdownButton id="dropdown-basic-button" title="User">
                    <Dropdown.Item as="button" onClick={redirectProfile}>My Profile</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                </DropdownButton>
                <ul>
                    <button onClick={redirectCreateRepo}>Create Repository</button>
                    <li>Repositories</li>
                    <li>Likes</li>
                </ul>
            </div>
            <PrivateRoute path='/search_result' component={() => ResultsInterface(search_input)}/>
        </div>
    );
}

export default PersonalHome;