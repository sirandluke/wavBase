import React from "react";
import "../../App.css";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import {audioSource} from "./Repository";
import db from "../../Model/base";

class CompIndRepo extends React.Component {
    constructor(props) {
        super(props);
    }

    uid = db.auth().currentUser.uid;

    function
}

export default IndividualRepository;