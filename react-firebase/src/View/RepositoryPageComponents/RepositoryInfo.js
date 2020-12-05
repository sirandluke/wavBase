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
                    <h3>BPM:{ this.state.bpm } | Key:{ this.state.key }</h3>
                    <p>{ this.state.description }</p>
                </div>
            </div>
        );
    }
}