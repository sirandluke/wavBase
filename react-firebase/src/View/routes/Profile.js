import React, {Component, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../../App.css";
import db from "../../Realtime_Database_config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Profile = ({history}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uid = db.auth().currentUser.uid;

    const redirectHome = () => {
        history.push("/");
    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const UpdateProfileImage = (picture, picture_path) => {
        //console.log(picture_path);
        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid, picture, picture_path
            })
        };
        fetch('http://localhost:8000/user_info/update_profile_image', config)
            .catch(error => console.log(error));
    }

    const handleUploadPicture = (event) => {
        event.preventDefault();
        let extension = document.getElementById('picture').value.split('.').pop();
        let picture_path = 'defaults/' + uid + '.' + extension;
        let picture = document.getElementById('picture').files[0];
        /*//let picture = new FormData();
        if (document.getElementById('picture').files.length) {
            //const upload_file = document.getElementById('picture').files[0];
            //picture.append('file', upload_file);
            let picture = document.getElementById('picture').files[0].name;

        } else {
            console.log('You need to select a file');
        }*/
        console.log(picture);
        UpdateProfileImage(picture, picture_path);
    }

    const handleInfoUpdate = (event) => {
        /*event.preventDefault();
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
        document.getElementById('new_bio').value = "";*/
    }

    const resetPassword = () => {
       /* db.auth().sendPasswordResetEmail(user_email).then(function () {
            console.log("Password Reset Email sent to:" + user_email);
        }).catch(function (error) {
            console.log("Password Reset Email not sent successfully");
        });*/
    }


    return (
        <div>
            <img id="profile_image" width={100} height={100}/>
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
                <Dropdown.Item as="button">My Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
            </DropdownButton>
            <button onClick={redirectHome}>Go Back to Home!</button>
        </div>
    );
}

export default Profile;