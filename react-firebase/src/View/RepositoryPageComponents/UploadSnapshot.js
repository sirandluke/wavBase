import React, {useState} from "react";
import db from "../../Model/base";
import folder_icon from "../../Images/folder@3x.png";
import {DateToString} from "../../Model/Date";


import "../../App.css";
import "./UploadSnapshot.css"

// todo: .DS_Store is uploaded.
// WE WILL USE THIS FUNCTION FOR UPLOAD SNAPSHOT

const UploadSnapshot = (props) => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [folder, setFolder] = useState(null);

    console.log("repo id is:" + props.repo_id);

    const handleUpload = async (e) => {
        e.preventDefault();
        const {snapshotDesc} = e.target.elements;

        let files = null;
        files = await uploadStorage();
        await delay(10000);
        uploadRealtime(files, snapshotDesc.value);

    }

    async function uploadStorage() {
        // Push all audio files to firestore.
        let filePaths = [];
        const files = folder;
        await Object.keys(files).forEach(i => {  // For each file, push to firestore and wait for this loop to finish.
            const file = files[i];
            // logic for file types.
            let storageSnapRef = db.storage().ref('/snapshots/' + props.repo_id + '/' + file.name)
            storageSnapRef.put(file).then(() => {
                const storageRef = db.storage().ref('/snapshots/' + props.repo_id);
                storageRef.child(file.name).getMetadata().then(metaData => {
                    console.log(metaData);
                    filePaths.push(metaData.fullPath)  // Add URLs to files array.
                    console.log("Pushed: " + metaData.fullPath);
                });
            });
        });

        console.log(filePaths.toString());
        return filePaths;
    }

    function uploadRealtime(files, snapshotDesc) {
        console.log(files.toString());
        console.log("here")
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

    return(
        <div>
            <div className="upload_title">
                <img className="snaps_ico" src={folder_icon} alt="snaps_ico" align="left" width="30" height="30"/>
                <h2>Take a Snapshot!</h2>
            </div>
            <p>Choose a project folder that you want to upload</p>
            <p>You can include anything from Ableton files, FL Studio files, midi's, wav's, mp3's, and more</p>
            <h3>^^ Ryan, make this p element less cheesy</h3>
            <form onSubmit={handleUpload}>
                <label>
                    <input accept="audio/*, .als, .flp, .band, .logicx"
                           directory="" webkitdirectory="" type="file" onChange={handleChange} multiple/>
                </label>
                <br />
                <p>Give your snapshot a name</p>
                <label>
                    <input
                        name="snapshotDesc"
                        required="required"
                        placeholder="Snapshot description" />
                </label>
                <br />

                <button className="upload_button" type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadSnapshot;