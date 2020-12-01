import React, {Component} from "react";
import ReactDOM from 'react-dom';
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";

const Repository = ({ history }) => {
    let audio;
    let audioSource= 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';

    function playAudio(source) {
        if (audio == null) {
            audio = new Audio(source);
        }
        audio.play();
    }

    function pauseAudio() {
        audio.pause();
    }

    function stopAudio() {
        audio.pause();
        audio.currentTime = 0;
    }

    function handlePlay() {
        playAudio(audioSource);
    }

    function redirectHome() {
        history.push("/");
    }


    return (
        <div>
            <button onClick={handlePlay}>Play</button>
            <button onClick={pauseAudio}>Pause</button>
            <button onClick={stopAudio}>Stop</button>
            < PlayButton audio={audioSource} />
            <button onClick={redirectHome}>Go Back to Home!</button>
        </div>
    );
};

export default Repository;