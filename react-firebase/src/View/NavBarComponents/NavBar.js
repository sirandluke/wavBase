import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/base";
import "../routes/PersonalHome.css";
import {useHistory} from 'react-router-dom';
import logo from "../../Images/wavBase_logo.png";
import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import {Link} from "react-router-dom";
import SearchBar from "../SearchComponents/SearchBar";


function NavBar({history}) {

    let user = db.auth().currentUser;
    //let name, email, photoUrl, uid, emailVerified;
    let name = "User";
    let username, profile_picture_path;
    if (user != null) {
        //name = user.email;

        let uid = db.auth().currentUser.uid;
        let firebaseRef = db.database().ref('users/' + uid);
        firebaseRef.on('value', (snapshot) =>{
            username = snapshot.val().username;
            profile_picture_path = snapshot.val().profile_picture;
            name = username;
        })
    }

    let storage = db.storage();
    let storageRef = storage.ref();
    if (profile_picture_path !== undefined){
        storageRef.child(profile_picture_path).getDownloadURL().then(function (url) {
            let img = document.getElementById('profile_picture');
            if (img != null)
                img.src = url;
            let img2 = document.getElementById('profile_picture2');
            if (img2 != null)
                img2.src = url;
        })
    }

    const redirectRepo = () => {
        history.push("/");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }
    return (
        <div className="nav_bar">
            <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />

            {/*<form className="search_bar">

                <input className="search_input" type="text" placeholder=" Search"
                       name="search"/>
                <button type="submit" className="search_btn">
                    <i className="fa fa-search">

                    </i>
                </button>

                TODO: not sure why this button takes me to sign in page everytime
            </form> */}}
            <SearchBar />

            <img id="profile_picture2" className="top_icon"/>

            <DropdownButton
                id="dropdown-item-button"
                title={ username }
                variant="success">
                <Dropdown.Item as="button" onClick={ redirectProfile }>My Profile</Dropdown.Item>
                <br />
                <Dropdown.Item as="button" onClick={ redirectRepo }>My Repositories</Dropdown.Item>
                <br />
                <Dropdown.Item as="button" onClick={ () => db.auth().signOut() }>Sign Out</Dropdown.Item>
                <br />
            </DropdownButton>
        </div>
    )
};

export default NavBar;