import React, {Component} from "react";
import {insertRepository} from "../../Model/FirebaseHandler";
import * as K from '../../Constants'
import {CreateRepoAction} from "../NewRepoComponents/CreateRepoAction";
import NavBar from "../NavBarComponents/NavBar.js";
import './NewRepo.css'
import logo from "../../Images/wavBase_logo.png";
import db from "../../Model/base";
import downArrow from "../../Images/downArrow.png";
import sine_wave_1 from "../../Images/sine_wave_1.png";
import '../NavBarComponents/NavBar.css'
import './NewRepo.css'
import {useHistory} from "react-router";


function NewRepo(props) {

    const history = useHistory();

    const redirectRepo = () => {
        history.push("/repository");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }

    return(
        <div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <img src={sine_wave_1} className={"bottom_wave"} style={{width:"100%", height:"233", bottom:"-10rem", zIndex:"-99", position:"absolute"}}/>

            <CreateRepoAction id="createRepoForm" />


        </div>
    );
}

export default NewRepo;

/* We now use navbar.js
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
                <div class="user_dropdown">
                    <button class="drop_button">User</button>
                    <div class="dropdown_content">
                        <a href="#" onClick={redirectProfile}>My Profile</a>
                        <a href="#" onClick={redirectRepo}>My Repositories</a>
                        <a href="#" onClick={() => db.auth().signOut()}>Sign Out</a>
                    </div>
                </div>
                <img src={downArrow} className="down_arrow" alt="Down Arrow" />
                {/*
                <DropdownButton className="user_dropdown" id="dropdown-basic-button" title="User">
                        <Dropdown.Item as="button" onClick={redirectProfile}>My Profile</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={redirectRepo}>My Repositories</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => db.auth().signOut()}>Sign Out</Dropdown.Item>
                </DropdownButton>

                User profile pic and user tab



                <form className="search_bar">
                    <input className="search_input" className="type_box" type="text" placeholder=" Search"
                           name="search"/>
                    <button type="submit" ><i className="fa fa-search"></i></button>
                </form>

            </div>
            */