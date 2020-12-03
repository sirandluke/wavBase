import React from "react";
import "../../App.css";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import {audioSource} from "./Repository";
import db from "../../Model/base";

const IndividualRepository = (repo_id) => {

    const uid = db.auth().currentUser.uid;
    const repo_ref = db.database().ref().child('repositories/' + repo_id);
    let description;

    let repo_name;
    let owner_id;
    repo_ref.on('value', (snapshot) => {
        repo_name = snapshot.val().name;
        description = snapshot.val().description;
        owner_id = snapshot.val().user_id;
    });

    let name_to_display = 'Firebase too slow';
    let owner_name;
    const owner_ref = db.database().ref('users/' + owner_id);
    owner_ref.on('value', (snapshot) =>{
        owner_name = snapshot.val().username;
        name_to_display = owner_name + '/' + repo_name;
        //window.location.reload(false);
    });

    return (
        <div>
            <h2>{name_to_display}</h2>
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