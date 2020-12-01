import React, {Component} from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";

export class DownloadSnapshotFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repo_id: this.props.repo_id,
            snapshot_id: this.props.snapshot_id
        }

        this.firebaseReference = db.database().ref('snapshots/' + this.snapshot_id);  // Has the paths to all file for snapshot.

        this.storageReference = db.storage().ref();

    }
    render() {
        // TODO:
        //  1. Use the firebase reference to get the file names/URLs thru firebaseRef
        // 2. Use the URLs to get the files from storage  thru storageRef
        // 3. Download the files to user's to computer

        return(
            <div>
                <button>Download</button>
            </div>
        );
    }
}