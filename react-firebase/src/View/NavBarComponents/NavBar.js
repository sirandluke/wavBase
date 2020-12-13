import React, {Component, useContext, useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/base";
import "../routes/PersonalHome.css";
import {useHistory} from 'react-router-dom';
import logo from "../../Images/wavBase_logo.png";
import {ProfileInfo} from "../HomePageComponents/ProfileInfo";
import {Link} from "react-router-dom";
import "./NavBar.css"
import {GetProfileImageUrl, GetUserRef} from "../../BackendFunctions";
import {AuthContext} from "../auth/Auth";

function NavBar(props) {

    const history = useHistory();
    const [user, setUser] = useState(props.user || []);
    const [image_url, setImageUrl] = useState(0);

    const {currentUser} = useContext(AuthContext);
    let current_uid = '';
    if (currentUser) {
        console.log(currentUser.uid);
        current_uid = currentUser.uid;
    }

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
                        let img;
                        if (document.getElementById('profile_picture2')) {
                            img = document.getElementById('profile_picture2');
                            img.src = image_url;
                        }
                        localStorage.setItem('current_uid', current_uid);
                        localStorage.setItem('username', user_snapshot.username);
                        localStorage.setItem('following', user_snapshot.following);
                    });
            }
            return () => {
                console.log('stop listen to home');
            }
        }, [props.user, useContext(AuthContext)]
    );

    const redirectLogIn = () => {
        history.push('/login');
    }


    const redirectRepo = () => {
        history.push("/");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    const handleSignOut = () => {
        localStorage.clear();
        history.push('/login');
        db.auth().signOut().then(r => {
            console.log('Successfully signed out');
        });
    }

    const handleSearch = (event) => {
        event.preventDefault();
        if (!currentUser) {
            history.push('/login');
        }
        if (document.getElementById('search_input').value !== '') {
            history.push('/search_result/repositories');
        }
    }
    return (
        <div className="nav_bar">
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <img src={logo} className="nav_bar_logo" alt="wavBase Logo"/>
            <form className="search_bar" onSubmit={handleSearch}>
                <label>
                    <input id='search_input' type="text" placeholder={'Search'}></input>
                </label>
                <button type="submit" className="search_btn"><i className="fa fa-search"></i></button>
            </form>

            {/*<img id="profile_picture2" className="top_icon" src={image_url}/>*/}

            {currentUser ?
                <div>
                    <img id="profile_picture2" className="top_icon" src={image_url}/>
                    <DropdownButton
                        id="dropdown-item-button"
                        title={user.username}
                        variant="success">

                        <Dropdown.Item as="button" onClick={redirectProfile}>My Profile</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </DropdownButton>
                </div> :
                <DropdownButton
                    id="dropdown-item-button"
                    title={'Sign In'}
                    variant="success"
                    onClick={redirectLogIn}>
                </DropdownButton>}
            {/*<DropdownButton
                id="dropdown-item-button"
                title={ user.username }
                variant="success">
                
                <Dropdown.Item as="button" onClick={ redirectProfile }>My Profile</Dropdown.Item>
                <Dropdown.Item as="button" onClick={ redirectRepo }>My Repositories</Dropdown.Item>
                <Dropdown.Item as="button" onClick={ handleSignOut }>Sign Out</Dropdown.Item>
            </DropdownButton>*/}
        </div>
    )
};

export default NavBar;