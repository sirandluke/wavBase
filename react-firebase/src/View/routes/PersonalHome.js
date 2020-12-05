import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import db from "../../Realtime_Database_config";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import ResultsInterface from "./ResultsInterface";
import PrivateRoute from "../auth/PrivateRoute";
import {useHistory} from 'react-router-dom';

export let search_input = '';

// TODO: render searchbar, likes, (add more)
function PersonalHome(props) {

    let current_uid = db.auth().currentUser.uid;
    const history = useHistory();
    const [current_user, setUser] = useState(props.user || []);

    const getUserRef = (current_uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_info?current_uid=' + current_uid, config)
            .then(response => response.json())
            .catch(error => console.log("Home page " + error));
    }

    let profile_image_url;

    useEffect(
        () => {
            if (!props.user) {
                getUserRef(current_uid)
                    .then(user_snapshot => {
                        setUser(user_snapshot);
                        document.getElementById('greeting_username').innerText = 'Hello ' + user_snapshot.username;
                        profile_image_url = db.storage().ref().child(user_snapshot.profile_picture).getDownloadURL().then(function (url) {
                            let img = document.getElementById('profile_avatar');
                            img.src = url;
                            let img2 = document.getElementById('profile_image');
                            if (img2 != null) {
                                img2.src = url;
                            }
                        });
                    });
            }
        }
    );


    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    const handleSearch = () => {
        search_input = document.getElementById('search_input').value;
        history.push("/search_result");
    }

    return (
        <div className="container">
            <h1>Home</h1>
            <div className="nav">
                <h2>wavBase</h2>
                <img src={logo} alt="wavBase Logo" width="50" height="50"/>
                {/*Search Bar Begin */}
                <form onSubmit={handleSearch}>
                    <label>
                        <input id='search_input' type="text" name="query"></input>
                    </label>
                    <button type="submit">Search</button>
                </form>
                {/*Search Bar End */}
                <h2 id={'greeting_username'}>Hello</h2>
                <img id='profile_avatar' src='' width={50} height={50}/>
                <DropdownButton id="dropdown-basic-button" title="User">
                    <Dropdown.Item as="button" onClick={redirectProfile}>My Profile</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                </DropdownButton>
                <ul>
                    <button onClick={redirectCreateRepo}>Create Repository</button>
                    <li>Repositories</li>
                    <li>Likes</li>
                </ul>
            </div>
            <PrivateRoute path='/search_result' component={() => ResultsInterface(search_input)}/>
        </div>
    );
}

export default PersonalHome;