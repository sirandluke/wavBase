import React, {useState} from "react";
import db from "../../Model/base";
import "../../App.css";
import DropzoneUpload from "./DropzoneUpload";

const UploadSnapshot = () => {

    const [folder, setFolder] = useState(null);
    let filePaths = [];

    const handleUpload = (e) => {
        e.preventDefault();
        const {snapshotDesc} = e.target.elements;

        uploadStorage().then( () => {  // Upload files to storage, then push to Real Time db.
            // Push audio file URLs, snapshot description, and datetime to RT db.
            let snapShotRef = db.database().ref("snapshots/");
            snapShotRef.push({
                description: snapshotDesc,
                files: filePaths.toString()
            });
        })
    }

    async function uploadStorage() {
        // Push all audio files to firestore.
        const files = folder;
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
    }


    const handleChange = e => {
        if (e.currentTarget.files) {
            setFolder(e.currentTarget.files);
            console.log("folder: ", folder)
        }
    };

    const handleOG= (e) =>
    {
        const file = e.target.files[0]
        const storageRef = db.storage().ref()
        const fileRef = storageRef.child(file.name)
        fileRef.put(file).then(() => {
            console.log("Uploaded" + file.name.toString());
        })

        /*
        let file = evt.target.files[0]
        let snapRef = db.storage().ref('snapshots/' + file.name)
        snapRef.put(file).then(() => {
            const storageRef = db.storage().ref('snapshots/')
            storagerRef.child(file.name).getMetadata().then(metaData => {
                let url = metaData.getDownloadURL()
                const snapshotRef = db.database().ref('snapshots');
                snapshotRef.push({})
            })
        }) */
    };


    const readMultipleFiles = () => {
    };
    console.log("folder: ", folder);



    return(
        <div>
            <form onSubmit={handleUpload}>
                <label>
                    <input
                        name="snapshotDesc"
                        required="required"
                        placeholder="Snapshot description" />
                </label>
                <br />
                <label>
                    <input directory="" webkitdirectory="" type="file" onChange={handleChange} multiple/>
                </label>
                <br />
                <button className="upload_button" type="submit">Upload</button>
            </form>
        </div>

    );
}

export default UploadSnapshot;