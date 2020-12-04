import React, {Component} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";
import {RepositoryInfo} from "../RepositoryPageComponents/RepositoryInfo";
import SnapshotList from "../RepositoryPageComponents/SnapshotList";

import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";

import SnapshotModal from "../RepositoryModals/SnapshotModal";
import UseSnapshotModal from "../RepositoryModals/UseSnapshotModal";

import {repo_tab} from "../../Constants";

import {useLocation} from 'react-router';

/**
 *
 * @param history -> pass in repo_id and user_id.
 * @returns {JSX.Element}
 * @constructor
 */
const Repository = ({history}) => {
    const location = useLocation();
    const {isShowing, toggle} = UseSnapshotModal();

    const redirectHome = () => {
        history.push("/");
    }

    return (

        <div>
            <RepositoryInfo repo_id={ location.state.repo_id }/>
            <SnapshotList repo_id={ location.state.repo_id }/>
            <button className="upload_pop_up" onClick={toggle}>Take a Snapshot</button>
            <SnapshotModal isShowing={isShowing} hide={toggle}>

            </SnapshotModal>
            <ul>
                <li>Snapshot 1</li>
                <li>Snapshot 2</li>
            </ul>
            <button onClick={ redirectHome }>Go Back to Home!</button>
        </div>
    );
};

export default Repository;