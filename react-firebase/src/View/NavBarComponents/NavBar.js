import React, {Component, useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/TODELETE_base";
import "../routes/PersonalHome.css";
import {useHistory} from 'react-router-dom';
import logo from "../../Images/wavBase_logo.png";
import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import {Link} from "react-router-dom";
import "./NavBar.css"
import {getProfileImageUrl, getUserRef} from "../../BackendFunctions";

function NavBar(props) {

    let current_uid = db.auth().currentUser.uid;
    const history = useHistory();
    const [user, setUser] = useState(props.user || []);

    useEffect(
        () => {
            console.log('listen to home');
            if (!props.user) {
                getUserRef(current_uid)
                    .then(user_snapshot => {
                        setUser(user_snapshot);
                        //document.getElementById('greeting_username').innerText = 'Hello ' + user_snapshot.username;

                        let image_path = user_snapshot.profile_picture;
                        let image_url;
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
                        //console.log(image_url);
                        let img = document.getElementById('profile_picture2');
                        img.src = image_url;
                        localStorage.setItem('following', user_snapshot.following);
                    });
            }
            return () => {
                console.log('stop listen to home');
            }
        }, [props.user]
    );


    const redirectRepo = () => {
        history.push("/");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }
    return (
        <div className="nav_bar">
            <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
            <form>
                <label>
                    <input id='search_input' type="text" placeholder={'Search'}></input>
                </label>
                <button type="submit"><Link to={'/search_result'}>Search</Link></button>
            </form>

            <img id="profile_picture2" className="top_icon"/>

            <DropdownButton
                id="dropdown-item-button"
                title={ user.username }
                variant="success">
                
                <Dropdown.Item as="button" onClick={ redirectProfile }>My Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={ redirectRepo }>My Repositories</Dropdown.Item>
                <Dropdown.Item as="button" onClick={ () => db.auth().signOut() }>Sign Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
};

export default NavBar;