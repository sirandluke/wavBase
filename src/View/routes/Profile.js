import React, {Component, useState, useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "../../App.css";
import db from "../../Model/base";
import Button from "react-bootstrap/Button";
import axios from 'axios';
//import Modal from "react-bootstrap/Modal";
//import logo from "../../Images/wavBase_logo.png";
import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import "./Profile.css";
import sine_wave_1 from "../../Images/sine_wave_1.png";
import '../NavBarComponents/NavBar.css';
//import NavBar from '../NavBarComponents/NavBar.js';
import Popup from "reactjs-popup";
import {useHistory} from "react-router";
import {
    GetProfileImageUrl,
    GetUserRef,
    UpdateUserInfo,
    UpdateUserPassword
} from "../../BackendFunctions";


function Profile(props) {

    /*const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let uid = db.auth().currentUser.uid;
    let userRef = db.database().ref('users/' + uid);
    let username, profile_picture_path, user_email;
    userRef.on('value', (snapshot) => {
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
        picture_storage.put(picture).then(function (snapshot) {
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
        db.auth().sendPasswordResetEmail(user_email).then(function () {
            console.log("Password Reset Email sent to:" + user_email);
            alert("Password Reset Email sent to: " + user_email);
        }).catch(function (error) {
            console.log("Password Reset Email not sent successfully");
        });
    }*/
    const history = useHistory();

    const [current_user, setUser] = useState(props.user || []);
    const [progress, setProgress] = useState(0);

    const uid = db.auth().currentUser.uid;

    const UpdateProfileImage = (picture_formData) => {
        axios.post('http://localhost:8000/user_info/update_profile_image', picture_formData, {
            onUploadProgress: (ProgressEvent) => {
                let tmp_progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgress(tmp_progress);
            }
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    const handleUploadPicture = (event) => {
        event.preventDefault();
        if (document.getElementById('picture').files.length !== 0) {
            let picture_object = document.getElementById('picture').files[0];
            let extension = document.getElementById('picture').value.split('.').pop();
            let picture_path = 'defaults/' + uid + '.' + extension;
            let picture = new FormData();
            picture.append('file', picture_object, uid + '.' + extension);
            console.log(picture);
            UpdateProfileImage(picture);
            UpdateUserInfo(uid, '', '', picture_path);
            let reader = new  FileReader();
            reader.onload = function () {
                let img = document.getElementById('profile_picture2');
                if (img != null) {
                    img.src = reader.result;
                }
                let img2 = document.getElementById(uid+'profile_picture');
                if (img2 != null) {
                    img2.src = reader.result;
                }
                localStorage.setItem(picture_path, reader.result);
            }
            reader.readAsDataURL(picture_object);
        }
    }

    const handleInfoUpdate = (event) => {
        event.preventDefault();
        let new_username = document.getElementById('new_username').value;
        let new_bio = document.getElementById('new_bio').value;
        UpdateUserInfo(uid, new_username, new_bio, '');
        //re_render(re_render_index + 1);
        if (new_username !== "") {
            /*let tmp_user = user;
            tmp_user = {...tmp_user, username: new_username};
            setUser(tmp_user);*/
            let profile_username = document.getElementById('username');
            if (profile_username != null) {
                profile_username.innerText = new_username;
            }
            console.log('New Username: ' + new_username);
            localStorage.setItem('username', new_username);
        }
        if (new_bio !== "") {
            /*let tmp_user = user;
            tmp_user = {...tmp_user, biography: new_bio};
            setUser(tmp_user);*/
            let bio_info = document.getElementById('bio');
            if (bio_info != null) {
                bio_info.innerText = new_bio;
            }
            console.log('New Bio: ' + new_bio);
        }
        document.getElementById('new_username').value = "";
        document.getElementById('new_bio').value = "";
    }

    const resetPassword = (event) => {
        event.preventDefault();
        let password = document.getElementById('new_password').value;
        let conf_password = document.getElementById('conf_password').value;
        if (password === conf_password) {
            UpdateUserPassword(uid, password);
        } else {
            alert('Confirmation Password Does Not Match');
        }
        document.getElementById('new_password').value = '';
        document.getElementById('conf_password').value = '';
    }

    useEffect(() => {
        console.log("listen to profile");
        GetUserRef(uid).then(user_snapshot => {
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

            let image_path = "defaults/test_user.png";
            if (user_snapshot.profile_picture !== '') {
                image_path = user_snapshot.profile_picture;
            }
            let image_url = '';
            if (localStorage.getItem(image_path)) {
                image_url = localStorage.getItem(image_path);
            } else {
                GetProfileImageUrl(image_path).then(url => {
                    url.map((link, key) => {
                        image_url = link;
                    })
                    localStorage.setItem(image_path, image_url);
                });
            }
            let img = document.getElementById('profile_avatar');
            if (img != null) {
                img.src = image_url;
            }
            let img2 = document.getElementById('profile_image');
            if (img2 != null) {
                img2.src = image_url;
            }

            console.log('re-render profile page');
            //re_render(false);
        })
        return () => {
            console.log('stop listen to profile');
        }
    }, [props.user]);

    return (
        <div>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="profile_div">
                <ProfileInfo uid={uid}/>

                <div id="profile_row_2">

                    <form method="post" onSubmit={handleInfoUpdate}>
                        <label>
                            <h3>Update Username</h3>

                            <input className="edit_input_1" name="username" type="text" id="new_username"
                                   placeholder="Username"/>
                        </label>
                        <br/>
                        <label>
                            <h3>Update Bio</h3>
                            <textarea className="edit_input_2" name="bio" type="text" id="new_bio"
                                      placeholder="Bio Information"/>
                        </label>
                        <input className="update_button" type="submit" value="Update"/>
                    </form>
                    <form method="post" onSubmit={resetPassword}>
                        <label>
                            <h3>Password</h3>
                            <input className="edit_input_1" name="password" type="text" id="new_password" placeholder="Enter your new password"/>
                        </label>
                        <br/>
                        <label>
                            <br/>
                            <input className="edit_input_1" name="confirmation_password" type="text" id="conf_password"
                                   placeholder="Re-enter your new password"/>
                        </label>
                        <br/>
                        <input className="update_button" type="submit" value="Update"/>
                    </form>
                    <div style={{marginBottom: "2rem"}} className="line"/>
                    <div className="profile_row_2_buttons">
                        <Popup trigger={<Button className="update_button" style={{width:'100%'}}>Edit Profile Picture</Button>} position={'right center'}>
                            <form method="post" onSubmit={handleUploadPicture}>
                                <input name="file" type="file" id="picture" accept="image/*"/>
                                <input name="token" type="hidden"/>
                                <input type="submit" value="submit"/>
                            </form>
                            {(progress) ? <p>Upload Progress: {progress}</p> : <></>}
                        </Popup>

                        {/*<button className="edit_profile_button 1" onClick={resetPassword}>Reset Password</button>*/}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Profile;