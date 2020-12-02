import React, {Component} from "react";
import {useHistory} from 'react-router-dom';
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";

function IndividualRepository(uid) {

    const history = useHistory();

    const returnHome = () => {
        history.push("/");
    }

    return (
        <div>
            <h1>{uid}</h1>
            <button onClick={returnHome}>Go Home</button>
        </div>
    );
}

export default IndividualRepository;