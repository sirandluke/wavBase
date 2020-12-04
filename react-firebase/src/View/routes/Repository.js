import React from "react";
import db from "../../Model/base";
import "../../App.css";
import logo from "../../Images/wavBase_logo.png";
import UploadSnapshot from "./UploadSnapshot";
import DropzoneUpload from "./DropzoneUpload";
import {UploadSnapshotComponent} from "./UploadSnapshotComponent";

const Repository = ({history}, repo_id) => {
    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }


    return (
        <div>
            <h1>Button 1 (UploadSnapshot.js)</h1>
            <UploadSnapshot repo_id={100}  />
        </div>

    );
}

export default Repository;