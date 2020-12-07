import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/base";
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
    let uid;
    let username;
    if (props.uid == null) {
        uid = db.auth().currentUser.uid;
    } else {
        uid = props.uid;
    }

    let firebaseRef = db.database().ref('users/' + uid);
    firebaseRef.on('value', (snapshot) =>{
        username = snapshot.val().username;
    })

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

    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col_1">
                    <div className="profile_info">
                        <ProfileInfo uid={uid} />
                        {/* <div style={{width:'100%',height:'2px', backgroundColor:'black'}}/> */}
                    </div>
                    </div>

                    <div className="col_2">
                    <div className="repository_lists">
                        <div className="repository_lists_top_row">
                            <h7>Your Repositories</h7>
                            <button className="create_repository" onClick={ redirectCreateRepo }>Create Repository</button>
                        </div>
                    <RepositoryList uid={uid}/>
                    </div>
                    </div>
                </div>
            </div>
            <img src={sine_wave_1} style={{width:"100%", bottom:'-15%', zIndex:"-99", position:"absolute"}}/> 
        </div>
    );
}

export default PersonalHome;