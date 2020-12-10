import React, {Component, useEffect, useState} from "react";
import {useParams, useRouteMatch, withRouter} from "react-router-dom";
//import {findRepositories} from "../../Model/FirebaseHandler";
import loading from "../../Images/loader.gif";
import repo_thumbnail from '../../Images/default_repo_thumbnail.png';
import './RepositoryInfo.css'
import {DeleteRepo, GetRepoInfo, GetUserRef, UpdateRepoInfo} from "../../BackendFunctions";
import {ParseTags} from "../GlobalComponent/ParseTags";
import db from "../../Model/TODELETE_base";
import {useHistory} from "react-router";
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";

export function RepositoryInfo(props) {

    const history = useHistory();
    const {repo_id} = useParams();
    const uid = db.auth().currentUser.uid;

    const [repo, setRepo] = useState(0);
    const repo_owner = props.repo_owner;


    const tags = ParseTags(repo.tags);

    function redirectToSettings() {
        history.push(`/repo/${repo.repo_id}/settings`);
    }

    function handleLike() {

    }

    useEffect(() => {
        if (props.repo) {
            setRepo(props.repo);
        }
        return () => {
            console.log('Repo Info Updated');
        }
    }, [props.repo]);

    const handleRepoInfoUpdate = (event) => {
        event.preventDefault();
        let new_tags = document.getElementById('new_tags').value;
        let new_description = document.getElementById('new_description').value;
        UpdateRepoInfo(repo_id, new_tags, new_description);
        if (new_tags && new_tags !== '') {
            let tmp_repo = repo;
            tmp_repo = {...tmp_repo, tags: new_tags};
            setRepo(tmp_repo);
        }
        if (new_description && new_description !== '') {
            let tmp_repo = repo;
            tmp_repo = {...tmp_repo, description: new_description};
            setRepo(tmp_repo);
        }
    }

    const handleDelete = (event) => {
        event.preventDefault();
        DeleteRepo(repo_id);
        history.push('/');
    }

    /*const redirectToRepoHomePage = (event) => {
        event.preventDefault();
        history.push(`/repo/${repo_id}`);
    }*/

    const handleShare = (event) => {
        event.preventDefault();
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert(window.location.href + ' copied to your clipboard');
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
                {(uid === repo.user_id) ?
                    <Popup trigger={<button>Settings</button>} position={'right center'}>
                        <form method="post" onSubmit={handleRepoInfoUpdate}>
                            <label>
                                <h3>Update Tags</h3>

                                <input className="edit_input_1" name="tags" type="text" id="new_tags"
                                       placeholder="Tags"/>
                            </label>
                            <br/>
                            <label>
                                <h3>Update Description</h3>
                                <textarea className="edit_input_2" name="description" type="text" id="new_description"
                                          placeholder="Description"/>
                            </label>
                            <br/>
                            <input className="update_button" type="submit" value="Update"/>
                        </form>
                        <form method="post" onSubmit={handleRepoInfoUpdate}>
                            <label>
                                <h3>Delete Repository</h3>
                                <br/>
                                <p>*Delete the repository. This will delete all aspects of the repository</p>
                            </label>
                            <button onClick={handleDelete}><h2>Delete</h2></button>
                        </form>
                    </Popup>
                    : <></>}
                <button onClick={handleShare}>Share</button>
            </div>

            <div className="repo_description">
                <p>Repo Description</p>
                <p id={'repo_description'}>{ repo.description }</p>
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
