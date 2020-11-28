import React, {useState} from "react";
import db from "../../Model/base";
import "../../App.css";

const UploadSnapshot = () => {

    const [folder, setFolder] = useState(null);

    const handleUpload = e => {
        const {snapshotDesc} = e.target.elements;
        readMultipleFiles();

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
        const files = folder;
        Object.keys(files).forEach(i => {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                //server call for uploading or reading the files one-by-one
                //by using 'reader.result' or 'file'
            }
            console.log("Uploaded" + file.name.toString());
        })
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