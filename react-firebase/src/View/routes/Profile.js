import React, {Component, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../../App.css";
import db from "../../Model/base";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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

    let storageRef = db.storage().ref();
    storageRef.child(profile_picture_path).getDownloadURL().then(function (url) {
        let img = document.getElementById('profile_picture');
        img.src = url;
    })

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
                biography: new_bio
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



    return (
        <div>
            <img id="profile_picture" width={125} height={125}/>
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
        </div>
    );
}

export default Profile;