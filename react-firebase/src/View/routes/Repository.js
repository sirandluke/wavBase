import React, {Component} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../GlobalComponent/PlayButton";
import {RepositoryInfo} from "../RepositoryPageComponents/RepositoryInfo";
import NavBar from '../NavBarComponents/NavBar.js';
import SnapshotList from "../RepositoryPageComponents/SnapshotList";
import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";
import './Repository.css';
import SnapshotModal from "../RepositoryModals/SnapshotModal";
import UseSnapshotModal from "../RepositoryModals/UseSnapshotModal";

import {repo_tab} from "../../Constants";
import {useLocation} from 'react-router';

/**
 *
 * @param history -> pass in repo object as prop.
 * @returns {JSX.Element}
 * @constructor
 */
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
            <NavBar/>
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

            <button className="redirect_home" onClick={ redirectHome }>Go Back to Home!</button>
        </div>
    );
};

export default Repository;