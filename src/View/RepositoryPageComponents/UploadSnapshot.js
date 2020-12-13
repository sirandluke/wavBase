import React, {useContext, useState} from "react";
import db from "../../Model/base";
import folder_icon from "../../Images/folder@3x.png";
import {DateToString, TimeStampToString} from "../GlobalComponent/Date";


import "../../App.css";
import "./UploadSnapshot.css"

import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import {CreateSnapshot, CreateSnapshotRef, GetFileMetadata} from "../../BackendFunctions";
import {useParams} from "react-router";
import {SnapshotListManager} from "./SnapshotListManager";

// todo: .DS_Store is uploaded.
// WE WILL USE THIS FUNCTION FOR UPLOAD SNAPSHOT

const UploadSnapshot = (props) => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    //const {repo_id} = useParams();

    const {setSnapshotList} = useContext(SnapshotListManager);

    const [folder, setFolder] = useState(null);

    const [showProgressBar, setProgressBar] = useState(false);

    const [upload_file_name, setUploadFileName] = useState(0);
    const [file_progress, setFileProgress] = useState(0);

    const [progress, setProgress] = useState(0);


    console.log("repo id is:" + props.repo_id);

    /*const UploadSnapshotFile = (file, destination) => {
        console.log(file);
        setUploadFileName(file.name);
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:8000/snapshot_info/upload_file?destination=' + destination, formData, {
            onUploadProgress: (ProgressEvent) => {
                let tmp_progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setFileProgress(tmp_progress);
            }
        }).then(res => {
            console.log(res);
            GetFileMetadata(destination).then(metaData => {
                updateProgressBar(total, count);
                count++;
                let data;
                console.log(metaData);
                metaData.map((d, key) => {
                    if (key === 0) {
                        data = d;
                    }
                })
                filePaths.push(data.fullPath)  // Add URLs to files array.
                console.log("Pushed: " + data.fullPath);
            });
            console.log('Uploaded');
        }).catch(err => console.log(err));
    }*/

    const handleUpload = async (e) => {
        e.preventDefault();
        setProgressBar(true);
        const {snapshotDesc} = e.target.elements;

        let files = null;
        files = await uploadStorage();
        uploadRealtime(files, snapshotDesc.value);
    }

    async function uploadStorage() {
        // Push all audio files to firestore.
        let filePaths = [];
        const files = folder;
        const total = files.length * 3;
        const time_stamp = TimeStampToString();
        let count = 1;
        for (const i of Object.keys(files)) {  // For each file, push to firestore and wait for this loop to finish.
            updateProgressBar(total, count);
            count++;
            const file = files[i];
            console.log(file);
            setUploadFileName(file.name);
            let destination = 'snapshots/' + props.repo_id + '/' + time_stamp + '/' + file.name;
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('http://localhost:8000/snapshot_info/upload_file?destination=' + destination, formData, {
                onUploadProgress: (ProgressEvent) => {
                    let tmp_progress = Math.round(
                        ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setFileProgress(tmp_progress);
                }
            }).then(async res => {
                //console.log(res);
                updateProgressBar(total, count);
                count++;
                await GetFileMetadata(destination).then(async metaData => {
                    updateProgressBar(total, count);
                    count++;
                    let data;
                    console.log(metaData);
                    metaData.map((d, key) => {
                        if (key === 0) {
                            data = d;
                        }
                    })
                    console.log(data);
                    await filePaths.push(data.name); // Add URLs to files array.
                    console.log("Pushed: " + data.name);
                });
                console.log('Uploaded');
            }).catch(err => console.log(err));
        }

        console.log('file paths:', filePaths.toString());
        return filePaths;
    }

    function updateProgressBar(total, stage) {
        setProgress(Math.round(((stage + progress) / total) * 100))
    }

    function uploadRealtime(files, snapshotDesc) {
        let datetime = DateToString();
        /*let snapShotRef = db.database().ref("snapshots/");
        snapShotRef.push({
            description: snapshotDesc,
            files: files.toString(),
            repo_id: props.repo_id,
            upload_date: datetime
        });*/
        //CreateSnapshot(snapshotDesc, files.toString(), props.repo_id, datetime);
        CreateSnapshotRef(snapshotDesc, files.toString(), props.repo_id, datetime).then(r => {
            console.log(r);
            let tmp_list = [];
            for (let snapshot in r) {
                tmp_list.push({...r[snapshot], snap_id: snapshot});
            }
            setSnapshotList(tmp_list);
        });
    }

    const handleChange = e => {
        if (e.currentTarget.files) {
            setFolder(e.currentTarget.files);
        }
    };

    const handleTest = (e) => {
        e.preventDefault();
        /*CreateSnapshotRef('Hey Yellow', 'JJJJJ', repo_id, '20202020').then(r => {
            console.log(r);
            let tmp_list = [];
            for (let snapshot in r) {
                tmp_list.push({...r[snapshot], snap_id: snapshot});
            }
            setSnapshotList(tmp_list);
        });*/
    }

    return (
        <div>
            <div className="upload_title_1">
                <img className="snaps_ico" src={folder_icon} alt="snaps_ico" align="left" width="30" height="30"/>
                <h2>Take a Snapshot!</h2>
            </div>
            {/*<button onClick={handleTest}>Test</button>*/}
            <p className="upload_description">Choose a project folder that you want to upload</p>
            <p className="upload_description">You can include anything from Ableton files, FL Studio files, midi's,
                wav's, mp3's, and more</p>
            <form onSubmit={handleUpload}>
                <label>
                    <input accept=".wav, .mp3, .als, .flp, .band, .logicx"
                           directory="" webkitdirectory="" type="file" onChange={handleChange} multiple/>
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
                {showProgressBar
                    ? <ProgressBar animated now={progress} label={`${progress}% complete`}/>
                    : <button className="upload_button_1" type="submit">Upload</button>
                }
            </form>
        </div>
    );
}

export default UploadSnapshot;