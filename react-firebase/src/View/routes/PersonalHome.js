import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
//import Home from "./Home";
import * as FirebaseHandler from "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import Route, {HashRouter, NavLink} from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Profile from "./Profile";
import Repository from "./Repository";
import NewRepo from "./NewRepo";
import IndividualRepository from "./IndividualRepository";

// TODO: render searchbar, likes, (add more)

const PersonalHome = ({history}) => {

    let user = db.auth().currentUser;
    let name, profile_picture_path, user_email;
    let uid;
    if (user != null) {
        let username;
        uid = db.auth().currentUser.uid;
        let userRef = db.database().ref('users/' + uid);
        userRef.on('value', (snapshot) => {
            username = snapshot.val().username;
            profile_picture_path = snapshot.val().profile_picture;
            user_email = snapshot.val().email;
        });
        name = username;
    }

    let storageRef = db.storage().ref();
    storageRef.child(profile_picture_path).getDownloadURL().then(function (url) {
        let img = document.getElementById('profile_avatar');
        img.src = url;
    });

    let repo_paths = [];
    let repo_ref = db.database().ref().child('repositories');
    repo_ref.orderByChild('user_id').equalTo(uid).on('value', (snapshot) => {
        snapshot.forEach((entry) => {
            repo_paths.push(
                <PrivateRoute exact path={'/' + entry.key} component={() => IndividualRepository(entry.key)}/>
            );
            console.log(entry.key);
        });
    });

    return (
        <div className="container">
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50"/>
                <h2>Hello {name}</h2>
                <img id='profile_avatar' src='' width={50} height={50}/>
                <HashRouter>
                    <DropdownButton id="dropdown-basic-button" title="User">
                        <Dropdown.Item as="button"><NavLink to='/profile'>My Profile</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink to='/'>My Repositories</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                    </DropdownButton>
                    <div>
                        <PrivateRoute exact path='/' component={Repository}/>
                        <PrivateRoute exact path='/profile' component={Profile}/>
                        <PrivateRoute exact path='/newrepo' component={NewRepo}/>
                        {repo_paths}
                    </div>
                </HashRouter>

            </div>
        </div>
    );
}

export default PersonalHome;