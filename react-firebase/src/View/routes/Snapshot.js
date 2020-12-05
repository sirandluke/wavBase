import React, {Component} from "react";
import "../../App.css";

import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";

import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";


import {SnapshotInfo} from "../SnapshotComponents/SnapshotInfo";
import {FileList} from "../SnapshotComponents/FileList";

import {useLocation} from 'react-router';

/**
 *
 * @param history
 * @returns {JSX.Element}
 * @constructor
 */
const Snapshot = ({history}) => {

    const location = useLocation();

    console.log(location.state.snapshot);
    console.log(location.state.repo_name);

    const redirectHome = () => {
        history.push("/");
    }

    return (
        <div>
            <SnapshotInfo
                username={location.state.username}
                repo_name = {location.state.repo_name}
                snapshot_desc = {location.state.snapshot.description}
                datetime = {location.state.snapshot.upload_date}
            />

            <FileList snapshot_paths={location.state.snapshot.files} />

            <button onClick={ redirectHome }>Go Back to Home!</button>
        </div>
    );
};

export default Snapshot;