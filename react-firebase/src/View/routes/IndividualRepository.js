import React, {Component} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import {audioSource} from "./Repository";
import db from "../../Model/base";

const IndividualRepository = (repo_id) => {

    let repo_ref = db.database().ref().child('repositories/' + repo_id);
    let name, description;
    repo_ref.on('value', (snapshot) => {
        name = snapshot.val().name;
        description = snapshot.val().description;
    });

    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <ul>
                <li>Snapshot 1</li>
                <li>Snapshot 2</li>
            </ul>
            <PlayButton audio={audioSource}/>
        </div>
    );
}

export default IndividualRepository;