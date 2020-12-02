import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
//import Home from "./Home";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import RepoModuleInProfile from "../../Model/RepoModuleInProfile";

// TODO: render searchbar, likes, (add more)

const PersonalHome = ({history}) => {

    let audioSource = 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';

    let user = db.auth().currentUser;
    let name = "YYY";
    let uid;
    if (user != null) {
        //name = user.email;
        let username;
        uid = db.auth().currentUser.uid;
        let firebaseRef = db.database().ref('users/' + uid);
        firebaseRef.on('value', (snapshot) =>{
            username = snapshot.val().username;
        })
        name = username;
    }

    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    const redirectRepo = () => {
        history.push("/");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    function red(target) {
        history.push("/" + target);
    }


    let repo_links = [];
    let repo_ref = db.database().ref().child('repositories');
    repo_ref.orderByChild('user_id').equalTo(uid).on('value', (snapshot) => {
        snapshot.forEach((entry) => {
            //repo_links.push(<li onClick={redirectRepo}>{entry.val().name}</li>);
            repo_links.push(
                <box>
                    <button onClick={() => red(entry.key)}>{entry.val().name}</button>
                    <PlayButton audio={audioSource} />
                </box>
            );
            console.log(entry.key);
        });
    })


    return (
        <div className="container">
            <h1>Home</h1>
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50"/>
                <h2>Hello {name}</h2>
                <DropdownButton id="dropdown-basic-button" title="User">
                    <Dropdown.Item as="button" onClick={redirectProfile}>My Profile</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                </DropdownButton>
                <ul>
                    <button onClick={redirectCreateRepo}>Create Repository</button>
                    <li>Repositories</li>
                    <div>{repo_links}</div>
                    <li>Likes</li>
                </ul>
            </div>
        </div>
    );
}

export default PersonalHome;