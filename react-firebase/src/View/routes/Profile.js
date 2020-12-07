import React, {Component, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../../App.css";
import db from "../../Model/base";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../Images/wavBase_logo.png";
import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import "./Profile.css"
import '../../NavBar.css'

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
        }).catch(function(error) {
            console.log("Password Reset Email not sent successfully");
        });
    }

    const redirectProfile = () => {
        // history.push("/profile");
        alert('You are already on Profile Page!');
    }


    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />

                <form className="search_bar">
                    <input className="search_input" type="text" placeholder=" Search"
                           name="search"/>
                    <button type="submit" className="search_btn"><i className="fa fa-search"></i></button>
                    {/*TODO: not sure why this button takes me to sign in page everytime*/}
                </form>
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
            <ProfileInfo />

            <div>
                <Button variant="primary" onClick={handleShow}>
                    Edit Profile Picture
                </Button>
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
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
            <h1>Profile</h1>
            <form method="post" onSubmit={handleInfoUpdate}>
                <label>
                    Username <br/>
                    <input name="username" type="text" id="new_username" placeholder="Username"/>
                </label>
                <br/>
                <label>
                    Bio <br/>
                    <input name="bio" type="text" id="new_bio" placeholder="Bio Information"/>
                </label>
                <br/>
                <input type="submit" value="Update"/>
            </form>
            <button onClick={resetPassword}>Reset Password</button>
            <DropdownButton id="dropdown-basic-button" title="User">
                <Dropdown.Item as="button" >My Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
            </DropdownButton>
            <button onClick={redirectHome}>Go Back to Home!</button>
        </div>
    );
}

export default Profile;