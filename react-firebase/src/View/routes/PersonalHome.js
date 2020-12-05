import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/base";
import "./PersonalHome.css";
import logo from "../../Images/wavBase_logo.png";
import './PersonalHome.css';
//import Home from "./Home";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";

import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import RepositoryList from "../HomePageComponents/RepositoryList";
import sine_wave_1 from "../../Images/sine_wave_1.png"



import Repository from "./Repository";

// TODO: render searchbar, likes, (add more)
const PersonalHome = ({history}) => {

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

    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
                {/* <div className="dropdown_button"> */}
                    <DropdownButton 
                    id="dropdown-item-button" 
                    title={ name }
                    variant="success">
                        <Dropdown.Item as="button" onClick={ redirectProfile }>My Profile</Dropdown.Item>
                        <br />
                        <Dropdown.Item as="button" onClick={ redirectRepo }>My Repositories</Dropdown.Item>
                        <br />
                        <Dropdown.Item as="button" onClick={ () => db.auth().signOut() }>Sign Out</Dropdown.Item>
                        <br />
                    </DropdownButton>
                {/* </div> */}
            </div>

            <div className="container">
                <div className="row">
                    <div className="col_1">
                    <div className="profile_info">
                        <ProfileInfo />
                        <div style={{width:'100%',height:'2px', backgroundColor:'black'}}/>
                    </div>
                    </div>

                    <div className="col_2">
                    <div className="repository_lists">
                        <div className="repository_lists_top_row">
                            <h7>Your Repositories</h7>
                            <button className="create_repository" onClick={ redirectCreateRepo }>Create Repository</button>
                        </div>
                    <RepositoryList/>
                    </div>
                    </div>
                </div>
            </div>
            <img src={sine_wave_1} style={{width:"100%", bottom:'-15%', zIndex:"-99", position:"absolute"}}/> 
        </div>
    );
}

export default PersonalHome;