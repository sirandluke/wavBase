import React, {Component} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import db from "../../Model/base";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {HashRouter, NavLink} from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import Profile from "./Profile";
import NewRepo from "./NewRepo";

const Repository = () => {

    let audioSource = 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';

    let user = db.auth().currentUser;
    let name, profile_picture_path, user_email;
    let uid;
    if (user != null) {
        let username;
        uid = db.auth().currentUser.uid;
        let userRef = db.database().ref('users/' + uid);
        userRef.on('value', (snapshot) => {
            username = snapshot.val().username;
            profile_picture_path = snapshot.val().profile_picture;
            user_email = snapshot.val().email;
        })
        name = username;
    }

    let repo_links = [];
    let repo_ref = db.database().ref().child('repositories');
    repo_ref.orderByChild('user_id').equalTo(uid).on('value', (snapshot) => {
        snapshot.forEach((entry) => {
            repo_links.push(
                <box>
                    <h2><NavLink to={'/' + entry.key}>{entry.val().name}</NavLink></h2>
                    <PlayButton audio={audioSource}/>
                </box>
            );
            console.log(entry.key);
        });
    })

    return (
        <div>
            <HashRouter>
                <button onClick><NavLink to='/newrepo'>Create Repository</NavLink></button>
            </HashRouter>
            <ul>
                <li>Repositories</li>
                <div>{repo_links}</div>
                <li>Likes</li>
            </ul>
        </div>
    );
};

export default Repository;