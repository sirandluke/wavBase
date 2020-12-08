import React, {Component, useState, useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../../App.css";
import db from "../../Model/TODELETE_base";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../Images/wavBase_logo.png";
import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import "./Profile.css";
import sine_wave_1 from "../../Images/sine_wave_1.png";
import '../NavBarComponents/NavBar.css';
import NavBar from '../NavBarComponents/NavBar.js';


const Profile = ({ history }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let uid = db.auth().currentUser.uid;
    let userRef = db.database().ref('users/' + uid);
    let username, profile_picture_path, user_email;
    userRef.on('value', (snapshot) =>{
        username = snapshot.val().username;
        profile_picture_path = snapshot.val().profile_picture;
        user_email = snapshot.val().email;
    })

    let storage = db.storage();
    let storageRef = storage.ref();
    storageRef.child(profile_picture_path).getDownloadURL().then(function (url) {
        let img = document.getElementById('profile_picture');
        let img2 = document.getElementById('profile_picture2');
        img.src = url;
        img2.src = url;
    })


    const redirectHome = () => {
        history.push("/");
    }

    // considering home page is repo page
    const redirectRepo = () => {
        history.push("/");
    }

    const handleUploadPicture = (event) => {
        event.preventDefault();
        let extension = document.getElementById('picture').value.split('.').pop();
        let picture_path = 'defaults/' + uid + '.' + extension;
        let picture_storage = storageRef.child(picture_path);
        let picture = document.getElementById('picture').files[0];
        console.log(picture);
        picture_storage.put(picture).then(function(snapshot) {
            console.log('New Profile Picture Uploaded');
        });
        userRef.update({
            profile_picture: picture_path
        });

    }

    const handleInfoUpdate = (event) => {
        event.preventDefault();
        let new_username = document.getElementById('new_username').value;
        let new_bio = document.getElementById('new_bio').value;
        if (new_username !== "") {
            userRef.update({
                username: new_username
            });
            console.log('New Username: ' + new_username);
        }
        if (new_bio !== "") {
            userRef.update({
                first_name: new_bio.split(' ')[0],
                last_name: new_bio.split(' ')[1]
            });
            console.log('New Bio: ' + new_bio);
        }
        document.getElementById('new_username').value = "";
        document.getElementById('new_bio').value = "";
    }

    const resetPassword = () => {
        db.auth().sendPasswordResetEmail(user_email).then(function() {
            console.log("Password Reset Email sent to:" + user_email);
            alert("Password Reset Email sent to: " + user_email);
        }).catch(function(error) {
            console.log("Password Reset Email not sent successfully");
        });
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <NavBar />
            <div className="profile_div">
            <ProfileInfo uid={uid} />

            <div id="profile_row_2">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose Your Profile Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method="post" onSubmit={handleUploadPicture}>
                            <input name="file" type="file" id="picture" accept="image/*"/>
                            <input name="token" type="hidden"/>
                            <input type="submit" value="submit"/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
                
            
            <form method="post" onSubmit={handleInfoUpdate}>
                <label>
                    <h3>Update Username</h3> 
                    
                    <input className="edit_input_1" name="username" type="text" id="new_username" placeholder="Username"/>
                </label>
                <br/>
                <label>
                    <h3>Update Bio</h3>
                    <textarea className="edit_input_2" name="bio" type="text" id="new_bio" placeholder="Bio Information"/>
                </label>
                <br/>
                <input className="update_button" type="submit" value="Update"/>
            </form>
            <div style={{marginBottom:"2rem"}} className="line"/>
            <div className="profile_row_2_buttons">
            <Button variant="primary" id="editProfilePicBtn" onClick={handleShow}>
                    Edit Profile Picture
                </Button>
                <button className="edit_profile_button 1" onClick={resetPassword}>Reset Password</button>
                <button className="edit_profile_button 2" onClick={redirectHome}>Go Back to Home!</button>
            </div>
            </div>
            </div>
            <img src={sine_wave_1} style={{width:"100%", float:'bottom', zIndex:"-99", position:"relative", marginTop:'1rem'}}/> 
        </div>
    );
}

export default Profile;