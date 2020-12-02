import React, {Component} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import {audioSource} from "./Repository";

const IndividualRepository = (repo_id) => {

    return (
        <div>
            <h1>{repo_id}</h1>
            <PlayButton audio={audioSource}/>
        </div>
    );
}

export default IndividualRepository;