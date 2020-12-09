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
import {GetProfileImageUrl, GetUserRef} from "../../BackendFunctions";

function NavBar(props) {

    let current_uid = db.auth().currentUser.uid;
    const history = useHistory();
    const [user, setUser] = useState(props.user || []);
    const [image_url, setImageUrl] = useState(0);

    useEffect(
        () => {
            console.log('listen to home');
            if (!props.user) {
                GetUserRef(current_uid)
                    .then(user_snapshot => {
                        setUser(user_snapshot);
                        //document.getElementById('greeting_username').innerText = 'Hello ' + user_snapshot.username;

                        let image_path = user_snapshot.profile_picture;
                        let image_url;
                        if (localStorage.getItem(image_path)) {
                            setImageUrl(image_url);
                            image_url = localStorage.getItem(image_path);
                        } else {
                            GetProfileImageUrl(image_path).then(url => {
                                url.map((link, key) => {
                                    image_url = link;
                                })
                                setImageUrl(image_url);
                                localStorage.setItem(image_path, image_url);
                            });
                        }
                        //console.log(image_url);
                        let img = document.getElementById('profile_picture2');
                        img.src = image_url;
                        localStorage.setItem('current_uid', current_uid);
                        localStorage.setItem('username', user_snapshot.username);
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

    const handleSignOut = () => {
        localStorage.clear();
        db.auth().signOut().then(r => {
            console.log('Successfully signed out');
        });
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

            <img id="profile_picture2" className="top_icon" src={image_url}/>

            <DropdownButton
                id="dropdown-item-button"
                title={ user.username }
                variant="success">
                
                <Dropdown.Item as="button" onClick={ redirectProfile }>My Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={ redirectRepo }>My Repositories</Dropdown.Item>
                <Dropdown.Item as="button" onClick={ handleSignOut }>Sign Out</Dropdown.Item>
            </DropdownButton>
        </div>
    )
};

export default NavBar;