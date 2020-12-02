import '../App.css';
import React, {Component, useState} from "react";
import {PlayButton} from "./PlayButton";

const RepoModuleInProfile = (history, uid, name) => {

    let audioSource = 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';

    function handleClick() {
        history.push('/');
    }

    return (
        <div>
            <box>
                <h1 onClick={handleClick}>{name}</h1>
                <PlayButton audio={audioSource}/>
            </box>
        </div>
    );
}

export default RepoModuleInProfile;
