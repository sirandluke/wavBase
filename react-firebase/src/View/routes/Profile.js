import React, {useEffect, useState} from "react";
import "../../App.css";
import db from "../../Database_config";
import Button from "react-bootstrap/Button";
import {Link, useHistory} from "react-router-dom";
import Popup from 'reactjs-popup';
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import {AddId, getIdCount} from "../../components/ParseId";
import FollowersPopUp from "../components/FollowersPopUp";
import FollowingPopUp from "../components/FollowingPopUp";
import {getProfileImageUrl, getUserRef, UpdateUserInfo, UpdateUserPassword} from "./BackendFunctions";

function Profile(props) {
    const history = useHistory();

    const [current_user, setUser] = useState(props.user || []);
    const [progress, setProgress] = useState(0);

    const uid = db.auth().currentUser.uid;

    const updateProfileImage = (picture_formData) => {
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
            updateProfileImage(picture);
            UpdateUserInfo('', '', picture_path);
            let reader = new FileReader();
            reader.onload = function () {
                let img = document.getElementById('profile_avatar');
                if (img != null) {
                    img.src = reader.result;
                }
                let img2 = document.getElementById('profile_image');
                if (img2 != null) {
                    img2.src = reader.result;
                }
            }
            reader.readAsDataURL(picture_object);
        }
    }

    const handleInfoUpdate = (event) => {
        event.preventDefault();
        let new_username = document.getElementById('new_username').value;
        let new_bio = document.getElementById('new_bio').value;
        UpdateUserInfo(uid, new_username, new_bio);
        //re_render(re_render_index + 1);
        if (new_username !== "") {
            /*let tmp_user = user;
            tmp_user = {...tmp_user, username: new_username};
            setUser(tmp_user);*/
            let profile_username = document.getElementById('display_username');
            if (profile_username != null) {
                profile_username.innerText = new_username;
            }
            console.log('New Username: ' + new_username);
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

            let image_path = "defaults/test_user.png";
            if (user_snapshot.profile_picture !== '') {
                image_path = user_snapshot.profile_picture;
            }
            let image_url = '';
            if (localStorage.getItem(image_path)) {
                image_url = localStorage.getItem(image_path);
            } else {
                getProfileImageUrl(image_path).then(url => {
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
            <img id="profile_image" width={100} height={100}/>
            <div>
                <Popup trigger={<Button>Edit Profile Picture</Button>} position={'right center'}>
                    <form method="post" onSubmit={handleUploadPicture}>
                        <input name="file" type="file" id="picture" accept="image/*"/>
                        <input name="token" type="hidden"/>
                        <input type="submit" value="submit"/>
                    </form>
                    {(progress) ? <p>Upload Progress: {progress}</p> : <></>}
                </Popup>
            </div>
            <h2 id={'display_username'}>username</h2>
            <Popup trigger={<button id={uid + 'followers'}>{getIdCount(current_user.followers)} followers</button>}
                   position={'right center'}>
                <FollowersPopUp id={uid}/>
            </Popup>
            <Popup trigger={<button id={uid + 'following'}>{getIdCount(current_user.following)} following</button>}
                   position={'right center'}>
                <FollowingPopUp id={uid}/>
            </Popup>
            <p id={'bio'}>bio</p>
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