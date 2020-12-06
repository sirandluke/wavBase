import React, {useState} from "react";
import db from "../../Model/base";
import folder_icon from "../../Images/folder@3x.png";
import {DateToString, TimeStampToString} from "../../Model/Date";


import "../../App.css";
import "./UploadSnapshot.css"

import ProgressBar from 'react-bootstrap/ProgressBar';

// todo: .DS_Store is uploaded.
// WE WILL USE THIS FUNCTION FOR UPLOAD SNAPSHOT

const UploadSnapshot = (props) => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [folder, setFolder] = useState(null);

    const [showProgressBar, setProgressBar] = useState(false);

    const [progress, setProgress] = useState(0);


    console.log("repo id is:" + props.repo_id);

    const handleUpload = async (e) => {
        e.preventDefault();
        setProgressBar(true);
        const {snapshotDesc} = e.target.elements;

        let files = null;
        files = await uploadStorage();
        await uploadRealtime(files, snapshotDesc.value);
    }

    async function uploadStorage() {
        // Push all audio files to firestore.
        let filePaths = [];
        const files = folder;
        const total = files.length * 3;
        const time_stamp = TimeStampToString();
        let count = 1
        for (const i of Object.keys(files)) {  // For each file, push to firestore and wait for this loop to finish.
            updateProgressBar(total, count);
            count++;
            const file = files[i];
            let storageSnapRef = db.storage()
                .ref('/snapshots/' + props.repo_id + '/' + time_stamp + '/' + file.name)
            await storageSnapRef.put(file).then(async () => {
                updateProgressBar(total, count);
                count++;
                const storageRef = db.storage().ref('/snapshots/' + props.repo_id + '/' + time_stamp);
                await storageRef.child(file.name).getMetadata().then( async metaData => {
                    updateProgressBar(total, count);
                    count++;
                    await filePaths.push(metaData.fullPath)  // Add URLs to files array.
                    console.log("Pushed: " + metaData.fullPath);
                });
            });
        }

        console.log(filePaths.toString());
        return filePaths;
    }

    function updateProgressBar(total, stage) {
        setProgress(Math.round(((stage + progress) / total) * 100))
    }

    function uploadRealtime(files, snapshotDesc) {
        let datetime = DateToString();
        let snapShotRef = db.database().ref("snapshots/");
        snapShotRef.push({
            description: snapshotDesc,
            files: files.toString(),
            repo_id: props.repo_id,
            upload_date: datetime
        });
    }

    const handleChange = e => {
        if (e.currentTarget.files) {
            setFolder(e.currentTarget.files);
        }
    };

    return (
        <div>
            <div className="upload_title">
                <img className="snaps_ico" src={ folder_icon } alt="snaps_ico" align="left" width="30" height="30"/>
                <h2>Take a Snapshot!</h2>
            </div>
            <p>Choose a project folder that you want to upload</p>
            <p>You can include anything from Ableton files, FL Studio files, midi's, wav's, mp3's, and more</p>
            <h3>^^ Ryan, make this p element less cheesy</h3>
            <form onSubmit={ handleUpload }>
                <label>
                    <input accept=".wav, .mp3, .als, .flp, .band, .logicx"
                           directory="" webkitdirectory="" type="file" onChange={ handleChange } multiple/>
                </label>
                <br/>
                <p>Give your snapshot a name</p>
                <label>
                    <input
                        name="snapshotDesc"
                        required="required"
                        placeholder="Snapshot description"/>
                </label>
                <br/>
                { showProgressBar
                    ? <ProgressBar animated now={ progress } label={ `${ progress }% complete` }/>
                    : <button className="upload_button" type="submit">Upload</button>
                }
            </form>
        </div>
    );
}

export default UploadSnapshot;