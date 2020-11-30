import React from "react";
import db from "../../Model/base";
import "../../App.css";
import {ProfileInfo} from "../components/ProfileInfo";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";


// TODO: render searchbar, likes, (add more)

const Profile = ({history}) => {


    return (
       <ProfileInfo />
    );
}

export default Profile;