import React, {Component, useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../../App.css";
import db from "../../Database_config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Link, useHistory} from "react-router-dom";
import {getIdCount} from "../../components/ParseId";

//import {UpdateProfileImage} from "../../model/UpdateProfileImage";

function Profile(props) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [current_user, setUser] = useState(props.user || []);
    const [re_render_index, re_render] = useState(0);
    const [profile_image_url, setProfileImageUrl] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = db.auth().currentUser;
    const uid = db.auth().currentUser.uid;

    const redirectHome = () => {
        history.push("/");
    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const getUserRef = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_info?current_uid=' + uid, config)
            .then(response => response.json())
            .catch(error => console.log("Home page " + error));
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

    const UpdateUserInfo = (username, bio) => {
        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid, username, bio
            })
        };
        fetch('http://localhost:8000/user_info/update_user_info', config)
            .catch(error => console.log(error));
    }

    const UpdateUserPassword = (password) => {
        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid, password
            })
        };
        fetch('http://localhost:8000/user_info/update_password', config)
            .catch(error => console.log(error));
    }

    const handleUploadPicture = (event) => {
        event.preventDefault();
        let extension = document.getElementById('picture').value.split('.').pop();
        let picture_path = 'defaults/' + uid + '.' + extension;
        let picture_object = document.getElementById('picture').files[0];
        let picture_url = URL.createObjectURL(picture_object);
        console.log(picture_url);
        let picture_storage = db.storage().ref().child(picture_path);
        let picture = document.getElementById('picture').files[0];
        console.log(picture);
        picture_storage.put(picture).then(function (snapshot) {
            console.log('New Profile Picture Uploaded');
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                let url = reader.result;
                let img = document.getElementById('profile_avatar');
                if (img != null) {
                    img.src = url;
                }
                let img2 = document.getElementById('profile_image');
                if (img2 != null) {
                    img2.src = picture_url;
                }
            }, false);
            if (picture_object) {
                reader.readAsDataURL(picture_object)
            }
            ;
        });
        db.database().ref('users/' + uid).update({
            profile_picture: picture_path
        });
        re_render(re_render_index + 1);
        //UpdateProfileImage(picture_url, picture_path);
    }

    const handleInfoUpdate = (event) => {
        event.preventDefault();
        let new_username = document.getElementById('new_username').value;
        let new_bio = document.getElementById('new_bio').value;
        UpdateUserInfo(new_username, new_bio);
        /*if (new_username !== '') {
            let profile_username = document.getElementById('display_username');
            if (profile_username != null) {
                profile_username.innerText = new_username;
            }
        }
        if (new_bio !== '') {
            let bio_info = document.getElementById('bio');
            if (bio_info != null) {
                bio_info.innerText = new_bio;
            }
        }*/
        re_render(re_render_index + 1);
        document.getElementById('new_username').value = "";
        document.getElementById('new_bio').value = "";
    }

    const resetPassword = (event) => {
        event.preventDefault();
        let password = document.getElementById('new_password').value;
        let conf_password = document.getElementById('conf_password').value;
        if (password === conf_password) {
            UpdateUserPassword(password);
        } else {
            alert('Confirmation Password Does Not Match');
        }
        document.getElementById('new_password').value = '';
        document.getElementById('conf_password').value = '';
    }

    useEffect(() => {
        console.log("listen to profile");
        if (!props.user) {
            getUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
                let profile_username = document.getElementById('display_username');
                if (profile_username != null) {
                    profile_username.innerText = user_snapshot.username;
                }

                let bio_info = document.getElementById('bio');
                if (bio_info != null) {
                    let user_bio = 'PROFESSIONALISM';
                    if (user_snapshot.biography !== '') {
                        user_bio = user_snapshot.biography
                    }
                    ;
                    bio_info.innerText = user_bio;
                }

                db.storage().ref().child(user_snapshot.profile_picture).getDownloadURL().then(function (url) {
                    let img = document.getElementById('profile_avatar');
                    if (img != url) {
                        img.src = url;
                    }

                    let img2 = document.getElementById('profile_image');
                    if (img2 != null) {
                        img2.src = url;
                    }
                });
                re_render(0);
                console.log('re-render profile page');
            })
        }
        return () => {
            console.log('stop listen to profile');
        }
    }, [props.user]);


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
            <h2 id={'display_username'}>username</h2>
            <button id={'followers'}>
                <Link to={'/followers/' + uid}>
                    {getIdCount(current_user.followers)} followers
                </Link>
            </button>
            <button id={'following'}>
                <Link to={'/following/' + uid}>
                    {getIdCount(current_user.following)} following
                </Link>
            </button>
            <p id={'bio'}>Bio</p>
            <form method="post" onSubmit={handleInfoUpdate}>
                <label>
                    Username <br/>
                    <input name="username" type="text" id="new_username" placeholder="Enter your new username"/>
                </label>
                <br/>
                <label>
                    Bio <br/>
                    <input name="bio" type="text" id="new_bio" placeholder="Edit bio"/>
                </label>
                <br/>
                <input type="submit" value="Update"/>
            </form>
            <form method="post" onSubmit={resetPassword}>
                <label>
                    Password <br/>
                    <input name="password" type="text" id="new_password" placeholder="Enter your new password"/>
                </label>
                <br/>
                <label>
                    <br/>
                    <input name="confirmation_password" type="text" id="conf_password"
                           placeholder="Re-enter your new password"/>
                </label>
                <br/>
                <input type="submit" value="Update"/>
            </form>
        </div>
    );
}

export default Profile;