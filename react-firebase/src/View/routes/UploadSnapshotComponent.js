import React, { Component } from "react";
import db from "../../Model/base";
import "../../App.css";

export class UploadSnapshotComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folder: null,
            repo_id: this.props.repo_id
        }

        this.firebaseRef = db.database().ref("/snapshots");
        this.storageRef = db.storage().ref("/uploads");
    }

    handleUpload = e => {
        const {snapshotDesc} = e.target.elements;

    }


    handleChange = e => {
        if (e.currentTarget.files) {
            console.log(e.currentTarget.files);
            this.setState({folder: e.currentTarget.files});
            console.log("folder: ", this.state.folder)
        }
    };

    /*
    async function uploadStorage() {
        // Push all audio files to firestore.
        const files = this.state.folder;
        Object.keys(files).forEach(i => {  // For each file, push to firestore.
            const file = files[i];
            let storageSnapRef = db.storage().ref('snapshots/' + file.name)
            storageSnapRef.put(file).then(() => {
                const storageRef = db.storage().ref('/snapshots');
                storageRef.child(file.name).getMetadata().then(metaData => {
                    filePaths.push(metaData.getDownloadURL)  // Add URLs to files array.
                    console.log("Pushed: " + file.name.toString());
                })
            })
        });
    } */



    render() {
        return(
            <form onSubmit={this.handleUpload}>
                <label>
                    <input
                        name="snapshotDesc"
                        required="required"
                        placeholder="Snapshot description" />
                </label>
                <br />
                <label>
                    <input directory="" webkitdirectory="" type="file" onChange={this.handleChange} multiple/>
                </label>
                <br />
                <button className="upload_button" type="submit">Upload</button>
            </form>
        );
    }
}