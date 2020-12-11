import React, {Component, useEffect, useState} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../GlobalComponent/PlayButton";
import {RepositoryInfo} from "../RepositoryPageComponents/RepositoryInfo";
import NavBar from '../NavBarComponents/NavBar.js';
import {SnapshotList} from "../RepositoryPageComponents/SnapshotList";
import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";
import './Repository.css';
import SnapshotModal from "../RepositoryModals/SnapshotModal";
import UseSnapshotModal from "../RepositoryModals/UseSnapshotModal";

import {repo_tab} from "../../Constants";
import {useHistory, useLocation, useParams} from 'react-router';
import {GetRepoInfo, GetUserRef} from "../../BackendFunctions";
import db from "../../Model/base";

/**
 *
 * @param history -> pass in repo object as prop.
 * @returns {JSX.Element}
 * @constructor
 */
function Repository(props) {
    const history = useHistory();
    const {isShowing, toggle} = UseSnapshotModal();
    const {repo_id} = useParams();

    const [repo, setRepo] = useState(0);
    const [repo_owner, setRepoOwner] = useState(0);

    useEffect(() => {
        console.log('Listening to repo:', repo_id);
        if (!repo) {
            GetRepoInfo(repo_id).then(repo_snapshot => {
                repo_snapshot = {...repo_snapshot, repo_id: repo_id};
                setRepo(repo_snapshot);
                GetUserRef(repo_snapshot.user_id).then(owner_snapshot => {
                    setRepoOwner(owner_snapshot);
                });
            });
        }
        return () => {
            console.log('Stop listening to repo:', repo_id);
        }
    }, [repo]);

    function redirectToSettings() {
        history.push(`/repo/${repo_id}/settings`);
    }

    function handleLike() {

    }

    function redirectToSnapshot() {

    }


    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <RepositoryInfo repo={repo} repo_owner={repo_owner}/>
            <div className="line"/>
            {/*<div className="info_upload_row">
                <h3>Snapshots</h3>
                <button className="upload_pop_up" onClick={toggle}>Take a Snapshot</button>
                {(repo && repo.user_id === uid) ? <button onClick={redirectToSettings}>Settings</button> : <button onClick={handleLike}>Like</button>}
            </div>

            <SnapshotModal isShowing={isShowing} hide={toggle} repo_id={repo_id}/>*/}

            {/*<SnapshotList
                repo_id={ repo_id }
                repo_name={repo.name}
            />*/}
        </div>
    );
}
export default Repository;
/*
const Repository = ({history}) => {
    const location = useLocation();
    const {isShowing, toggle} = UseSnapshotModal();

    console.log(location.state.repo);


    const redirectHome = () => {
        history.push("/");
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <RepositoryInfo repo={ location.state.repo }/>
            <div className="line"/>
            <div className="info_upload_row">
                <h3>Snapshots</h3>
                <button className="upload_pop_up" onClick={toggle}>Take a Snapshot</button>
            </div>
            
            <SnapshotModal isShowing={isShowing} hide={toggle} repo_id={location.state.repo.repo_id}/>


            <SnapshotList
                repo_id={ location.state.repo.repo_id }
                repo_name={location.state.repo.name}
            />

            {/!*<button className="redirect_home" onClick={ redirectHome }>Go Back to Home!</button>*!/}
        </div>
    );
};

export default Repository;
*/
