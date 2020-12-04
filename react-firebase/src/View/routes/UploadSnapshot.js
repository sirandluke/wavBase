import React, {useState} from "react";
import db from "../../Model/base";
import "../../App.css";


// todo: .DS_Store is uploaded.
// WE WILL USE THIS FUNCTION FOR UPLOAD SNAPSHOT

const UploadSnapshot = (props) => {

    const [folder, setFolder] = useState(null);
    let filePaths = [];

    console.log("repo id is:" + props.repo_id);

    const handleUpload = async (e) => {
        e.preventDefault();
        const {snapshotDesc} = e.target.elements;

        const files = await uploadStorage();

        uploadSnapshot(files, snapshotDesc.value);
    }

    async function uploadStorage() {
        // Push all audio files to firestore.
        const files = folder;
        await Object.keys(files).forEach(i => {  // For each file, push to firestore and wait for this loop to finish.
            const file = files[i];
            // logic for file types.
            let storageSnapRef = db.storage().ref('snapshots/' + file.name)
            storageSnapRef.put(file).then(() => {

                const storageRef = db.storage().ref('/snapshots');
                storageRef.child(file.name).getMetadata().then(metaData => {
                    console.log(metaData);
                    filePaths.push(metaData.fullPath)  // Add URLs to files array.
                    console.log("Pushed: " + file.name.toString());
                })
            })
        })
        return filePaths;
    }

    function uploadSnapshot(files, snapshotDesc) {
        console.log(files);
        console.log(files.toString());
        let snapShotRef = db.database().ref("snapshots/");
        snapShotRef.push({
            description: snapshotDesc,
            files: files.toString()
        });
    }


    const handleChange = e => {
        if (e.currentTarget.files) {
            setFolder(e.currentTarget.files);
        }
    };

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
                    <input accept="audio/*, .als, .flp, .band, .logicx"
                           directory="" webkitdirectory="" type="file" onChange={handleChange} multiple/>
                </label>
                <br />
                <button className="upload_button" type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadSnapshot;