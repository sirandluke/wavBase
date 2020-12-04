import React, {Component} from "react";
import db from "../../Model/base";
import { withRouter } from "react-router-dom";
import {findRepositories} from "../../Model/FirebaseHandler";
import loading from "../../Images/loader.gif";

export class RepositoryInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            repo_name: '',
            bpm: '',
            key: '',
            tags: '',
            description: '',
            thumbnail_path: '',
            datetime: '',
        }

        this.firebaseRef = db.database().ref("repositories");
        this.storageRef = db.storage().ref();
    }

    componentDidMount() {
        this.setState({
            username: 'lsirand',
            repo_name: 'My First Song',
            bpm: '135',
            key: 'D maj',
            tags: '',
            description: 'This is totally epic.',
            thumbnail_path: '',
            datetime: '',
        })
    }

    render() {

        return(
            <div>
                <div className="left_element">
                    <img className="repo_thumbnail" id="repo_thumbnail" src={loading} alt="Repository Thumbnail"/>
                </div>
                <div className="repo_title">
                    <h2>{ this.state.username }/{ this.state.repo_name }</h2>
                    <h3>BPM:{ this.state.bpm } | Key:{ this.state.key }</h3>
                    <p>{ this.state.description }</p>
                </div>
            </div>
        );
    }
}