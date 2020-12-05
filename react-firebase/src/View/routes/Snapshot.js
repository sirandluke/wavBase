import React, {Component} from "react";
import "../../App.css";
import * as K from '../../Constants';
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import {PlayButton} from "../../Model/PlayButton";

import UploadSnapshot from "../RepositoryPageComponents/UploadSnapshot";


import {repo_tab} from "../../Constants";

import {useLocation} from 'react-router';

/**
 *
 * @param history -> pass in repo object as prop.
 * @returns {JSX.Element}
 * @constructor
 */
const Snapshot = ({history}) => {
    const location = useLocation();

    console.log(location.state.repo);


    const redirectHome = () => {
        history.push("/");
    }

    return (
        <div>
            <ul>
                <li>Snapshot 1</li>
                <li>Snapshot 2</li>
            </ul>
            <button onClick={ redirectHome }>Go Back to Home!</button>
        </div>
    );
};

export default Snapshot;