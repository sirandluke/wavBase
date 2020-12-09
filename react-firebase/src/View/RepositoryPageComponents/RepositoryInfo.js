import React, {Component, useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";
//import {findRepositories} from "../../Model/FirebaseHandler";
import loading from "../../Images/loader.gif";
import repo_thumbnail from '../../Images/default_repo_thumbnail.png';
import './RepositoryInfo.css'
import {GetRepoInfo, GetUserRef} from "../../BackendFunctions";
import {ParseTags} from "../GlobalComponent/ParseTags";
import db from "../../Model/TODELETE_base";
import {useHistory} from "react-router";

export function RepositoryInfo(props) {

    const history = useHistory();
    const uid = db.auth().currentUser.uid;

    const repo = props.repo;
    const repo_owner = props.repo_owner;

    const tags = ParseTags(repo.tags);

    function redirectToSettings() {
        history.push(`/repo/${repo.repo_id}/settings`);
    }

    function handleLike() {

    }

    return(
        <div>
            <div className="left_element">
                <img className="repo_thumbnail"
                     id="repo_thumbnail"
                     src={repo_thumbnail}
                     alt="Repository Thumbnail"
                />
            </div>
            <div className="repo_title">
                <h2>{ repo_owner.username }/{ repo.name }</h2>
                <h3>BPM:{ repo.bpm } | Key: { repo.key }</h3>
                <h3>Tags: </h3>
                {tags.map(tag =>
                    <button>{tag}</button>
                )}
                <br/>
                {(uid === repo.user_id) ? <button onClick={redirectToSettings}>Settings</button> : <button onClick={handleLike}>Like</button>}
            </div>

            <div className="repo_description">
                <p>Repo Description</p>
                <p>{ repo.description }</p>
            </div>
        </div>
    );
}

/*
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

        this.userRef = db.database().ref("users/" + this.props.repo.user_id);
        this.storageRef = db.storage().ref();
    }

    componentDidMount() {
        this.userRef
            .once('value', data => {
                let username = data.val().username;
                this.setState({
                    username: username,
                    repo_name: this.props.repo.name,
                    bpm: this.props.repo.bpm,
                    key: this.props.repo.key,
                    tags: this.props.repo.tags,
                    description: this.props.repo.description,
                    thumbnail_path: this.props.repo.thumbnail,
                    datetime: this.props.repo.upload_date,
                });
            }).then(() => {

                this.storageRef.child(this.state.thumbnail_path).getDownloadURL().then(function (url) {
                    console.log(url);
                    let pfp = document.getElementById("repo_thumbnail");
                    pfp.src = url;
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    render() {

        return(
            <div>
                <div className="left_element">
                    <img className="repo_thumbnail"
                         id="repo_thumbnail"
                         src={loading}
                         alt="Repository Thumbnail"
                    />
                </div>
                <div className="repo_title">
                    <h2>{ this.state.username }/{ this.state.repo_name }</h2>
                    <h3>BPM:{ this.state.bpm } | Key: { this.state.key }</h3>
                </div>

                <div className="repo_description">
                    <p>Repo Description</p>
                    <p>{ this.state.description }</p>
                </div>
            </div>
        );
    }
}*/
