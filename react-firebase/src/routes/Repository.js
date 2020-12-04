import React, {Component} from "react";
import "../App.css";
import * as K from '../Constants';
import * as FirebaseHandler from "../model/FirebaseHandler.js";
import {PlayButton} from "../model/PlayButton";

const Repository = ({ history }) => {
    let audioSource= 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';

    const redirectHome = () => {
        history.push("/");
    }


    return (
        <div>
            < PlayButton audio={audioSource} />
            <ul>
                <li>Snapshot 1</li>
                <li>Snapshot 2</li>
            </ul>
            <button onClick={redirectHome}>Go Back to Home!</button>
        </div>
    );
};

export default Repository;