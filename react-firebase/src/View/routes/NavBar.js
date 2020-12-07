
import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import db from "../../Model/base";
import "./PersonalHome.css";
import logo from "../../Images/wavBase_logo.png";


const NavBar = ({history}) => {
    let user = db.auth().currentUser;
    //let name, email, photoUrl, uid, emailVerified;
    let name = "User";
    if (user != null) {
        //name = user.email;
        let username;
        let uid = db.auth().currentUser.uid;
        let firebaseRef = db.database().ref('users/' + uid);
        firebaseRef.on('value', (snapshot) =>{
            username = snapshot.val().username;
            name = username;
        })
    }

    const redirectRepo = () => {
        history.push("/repository");
    }

    const redirectProfile = () => {
        history.push("/profile");
    }
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className="nav_bar">
                <img src={logo} className="nav_bar_logo" alt="wavBase Logo" />
                {/* <div className="dropdown_button"> */}
                    <DropdownButton 
                    id="dropdown-item-button" 
                    title={ name }
                    variant="success">
                        <Dropdown.Item as="button" onClick={ redirectProfile }>My Profile</Dropdown.Item>
                        <br />
                        <Dropdown.Item as="button" onClick={ redirectRepo }>My Repositories</Dropdown.Item>
                        <br />
                        <Dropdown.Item as="button" onClick={ () => db.auth().signOut() }>Sign Out</Dropdown.Item>
                        <br />
                    </DropdownButton>
            
            </div>
        </div>
    );
};

export default NavBar;