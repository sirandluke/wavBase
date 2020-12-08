import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/TODELETE_base";
import "./PersonalHome.css";
import logo from "../../Images/wavBase_logo.png";
import './PersonalHome.css';
import '../../App.css'
import '../NavBarComponents/NavBar.css'
import NavBar from '../NavBarComponents/NavBar.js';
//import Home from "./Home";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";

import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import RepositoryList from "../HomePageComponents/RepositoryList";
import sine_wave_1 from "../../Images/sine_wave_1.png"



import Repository from "./Repository";
import SearchBar from "../SearchComponents/SearchBar";
import PrivateRoute from "../auth/PrivateRoute";

// TODO: render searchbar, likes, (add more)
const PersonalHome = ({history}, props) => {

    /*
    let user = db.auth().currentUser;
    //let name, email, photoUrl, uid, emailVerified;
    let name = "User";
    if (user != null) {
        //name = user.email;
        let username;
        let uid = db.auth().currentUser.uid;
        let firebaseRef = db.database().ref('users/' + uid);
        firebaseRef.on('value', (snapshot) =>{
            username = snapshot.val().username;
            name = username;
        })
    }
*/

    // let uid = db.auth().currentUser.uid;
    // let userRef = db.database().ref('users/' + uid);
    // let username, profile_picture_path, user_email;
    // userRef.on('value', (snapshot) =>{
    //     username = snapshot.val().username;
    //     profile_picture_path = snapshot.val().profile_picture;
    //     user_email = snapshot.val().email;
    // })
    //
    // let storage = db.storage();
    // let storageRef = storage.ref();
    // storageRef.child(profile_picture_path).getDownloadURL().then(function (url) {
    //     let img2 = document.getElementById('profile_picture2');
    //     img2.src = url;
    // })

    return (
        <div>
            <NavBar />
            <PrivateRoute path={"/repo/:repo_id"} component={Repository}/>
            <PrivateRoute path={'/user/:user_id'} component={RepositoryList}/>
        </div>

    );
}

export default PersonalHome;