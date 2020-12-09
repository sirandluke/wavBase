import React, {Component, useEffect, useState} from "react";
import "../../App.css";

import * as K from '../../Constants';
import * as FirebaseHandler from "../../Model/FirebaseHandler.js";
import {PlayButton} from "../GlobalComponent/PlayButton";

import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";


import {SnapshotInfo} from "../SnapshotComponents/SnapshotInfo";

import {useHistory, useLocation, useParams} from 'react-router';
import {LoadingFiles} from "../SnapshotComponents/LoadingFiles";
import {GetRepoInfo, GetSnapshotInfo, GetUserRef} from "../../BackendFunctions";

function Snapshot(props) {
    const history = useHistory();
    const {repo_id, snap_id} = useParams();
    const [snapshot, setSnapshot] = useState(0);
    const [repo, setRepo] = useState(0);
    const [owner, setOwner] = useState(0);

    useEffect(() => {
        console.log('Listening to snapshot info snap_id:', snap_id);
        if (!snapshot) {
            GetSnapshotInfo(snap_id).then(snap_snapshot => {
                setSnapshot(snap_snapshot);
            })
        }
        if (!repo) {
            GetRepoInfo(repo_id).then(repo_snapshot => {
                repo_snapshot = {...repo_snapshot, repo_id: repo_id};
                setRepo(repo_snapshot);
                if (repo_snapshot.user_id) {
                    GetUserRef(repo_snapshot.user_id).then(user_snapshot => {
                        setOwner(user_snapshot);
                    })
                }
            })
        }
        return () => {
            console.log('Stop listening to snapshot info snap_id:', snap_id);
        }
    }, [snapshot])

    return (
        <div>
            <SnapshotInfo
                username={owner.username}
                repo_name={repo.name}
                snapshot_desc={snapshot.description}
                datetime={snapshot.upload_date}
            />

            {/*<LoadingFiles
                snapshot_paths={snapshot.files}
                snapshot_name={snapshot.description}
            />*/}
        </div>
    );
}

export default Snapshot;
/**
 *
 * @param history
 * @returns {JSX.Element}
 * @constructor
 */
/*
const Snapshot = ({history}) => {

    const location = useLocation();

    console.log(location.state.snapshot);
    console.log(location.state.repo_name);

    return (
        <div>
            <SnapshotInfo
                username={location.state.username}
                repo_name = {location.state.repo_name}
                snapshot_desc = {location.state.snapshot.description}
                datetime = {location.state.snapshot.upload_date}
            />

            <LoadingFiles
                snapshot_paths={location.state.snapshot.files}
                snapshot_name={location.state.snapshot.description}
            />
        </div>
    );
};

export default Snapshot;*/
