import React, {Component, useEffect, useState} from "react";
import {useParams, useRouteMatch, withRouter} from "react-router-dom";
//import {findRepositories} from "../../Model/FirebaseHandler";
import loading from "../../Images/loader.gif";
import repo_thumbnail from '../../Images/default_repo_thumbnail.png';
import './RepositoryInfo.css'
import {DeleteRepo, GetRepoInfo, GetUserRef, HandleComment, HandleLike, UpdateRepoInfo} from "../../BackendFunctions";
import {ParseTags} from "../GlobalComponent/ParseTags";
import db from "../../Model/base";
import {useHistory} from "react-router";
import Popup from "reactjs-popup";
import CommentsDisplayComponent from "./CommentsDisplayComponent";
import {AddId, DeleteId, IncludeId} from "../GlobalComponent/ParseId";
import LikedListDisplayComponent from "./LikedListDisplayComponent";
import ShareButtons from "../ShareRepoComponent/ShareButtons";

export function RepositoryInfo(props) {

    const history = useHistory();
    const {repo_id} = useParams();
    const visitor_id = db.auth().currentUser.uid;

    //const [repo, setRepo] = useState(0);
    const [repo, setRepo] = useState(0);
    const [visitor, setVisitor] = useState(0);
    const [comments, setComments] = useState(0);
    const repo_owner = props.repo_owner;
    //const [repo_owner, setRepoOwner] = useState(0);


    const tags = ParseTags(repo.tags);

    function redirectToSettings() {
        history.push(`/repo/${repo.repo_id}/settings`);
    }

    useEffect(() => {
        if (props.repo) {
            setRepo(props.repo);
            //console.log(props.repo.comments);
            let tmp_comments = [];
            if (props.repo.comments) {
                for (let comment in props.repo.comments) {
                    tmp_comments.push({...props.repo.comments[comment], key: comment});
                }
            }
            setComments(tmp_comments);
        }
        /*if (props.repo_owner) {
            setRepoOwner(props.repo_owner)
        }*/
        if (!visitor) {
            if (visitor_id) {
                GetUserRef(visitor_id).then(r => {
                    setVisitor(r);
                });
            }
        }
        return () => {
            console.log('Repo Info Updated');
        }
    }, [props.repo, props.repo_owner]);

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
        alert(`Repo ${repo.name} Deleted`);
        DeleteRepo(repo_id);
        history.push('/');
    }

    const handleLike = (event) => {
        event.preventDefault();
        let like_id_list = '';
        if (repo.likes && IncludeId(repo.likes, visitor_id)) {
            like_id_list = DeleteId(repo.likes, visitor_id);
            console.log(`${visitor.username} cancelled like to repo ${repo_id}`);
        } else {
            like_id_list = AddId(repo.likes, visitor_id);
            console.log(`${visitor.username} liked repo ${repo_id}`);
        }
        let tmp_repo = repo;
        tmp_repo = {...tmp_repo, likes: like_id_list};
        setRepo(tmp_repo);
        HandleLike(repo_id, like_id_list);
    }

    /*const redirectToRepoHomePage = (event) => {
        event.preventDefault();
        history.push(`/repo/${repo_id}`);
    }*/

    /*const handleShare = (event) => {
        event.preventDefault();
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert(window.location.href + ' copied to your clipboard');
    } */


    const handleComment = (e) => {
        e.preventDefault();
        const comment = document.getElementById('new_comment').value;
        if (comment && comment !== '') {
            HandleComment(repo_id, visitor.username, comment);
            let tmp_comments = [...comments];
            tmp_comments.push({...tmp_comments[tmp_comments.length], text: comment, username: visitor.username});
            setComments(tmp_comments);
        }
        else {
            alert('Cannot comment blank');
        }
        document.getElementById('new_comment').value = '';
    }

    return(
        <div style={{marginLeft:'3rem', marginRight:'3rem'}}>
            <div className="left_element">
                <img className="repo_thumbnail"
                     id="repo_thumbnail"
                     src={repo_thumbnail}
                     alt="Repository Thumbnail"
                />
            </div>
            <div className="repo_title">
                    <div className="name_btn">
                        <h2>{ repo_owner.username }/{ repo.name }</h2>
                    </div>
                    <div className="share_btns">
                        <ShareButtons repo_name={repo.name} repo_owner={repo_owner.username}/>
                    </div>
                <div className="bpm_key_tags">
                    <h3>BPM:{ repo.bpm } | Key: { repo.key }</h3>
                    <h3>Tags: </h3>
                    {tags.map(tag =>
                        <button>{tag}</button>
                    )}
                </div>
                { /*<button onClick={handleShare}>Share</button>*/ }
            </div>
            <div className="repo_buttons_class">
            {(visitor_id === repo.user_id) ?
                    <Popup trigger={<button style={{marginLeft:'0rem', marginRight:'0.5rem'}} className="update_button1">Settings</button>} position={'right center'}>
                        <div className="snapshot_popup1">
                        <form style={{width:'100%',display:'inline-block'}} method="post" onSubmit={handleRepoInfoUpdate}>
                            <label>
                                <h3>Update Tags</h3>

                                <input className="edit_input_1" name="tags" type="text" id="new_tags"
                                       placeholder="Tags" defaultValue={repo.tags}/>
                            </label>
                            <label>
                                <h3>Update Description</h3>
                                <textarea className="edit_input_2" name="description" type="text" id="new_description"
                                          placeholder="Description"/>
                            </label>
                            
                            <input className="update_button" type="submit" value="Update"/>
                        </form>
                        <br/>
                        <div className="line"/>
                        <form method="post" onSubmit={handleRepoInfoUpdate}>
                            <label>
                                <h3>Delete Repository</h3>
                                <h5>*Delete the repository. This will delete all aspects of the repository</h5>
                            </label>
                            {<button className='update_button1' onClick={handleDelete}>Delete</button>}
                        </form>
                        </div>
                    </Popup>
                    : <></>}
            <div className='repo_likes'>
                {(repo.likes && IncludeId(repo.likes, visitor_id)) ?
                    <button style={{marginLeft:'0rem'}} className="update_button1" onClick={handleLike}>Liked</button> :
                    <button style={{marginLeft:'0rem'}} className="update_button1" onClick={handleLike}>Like</button>}
                <LikedListDisplayComponent likes={repo.likes} />
            </div>
            </div>

            <div className="repo_description">
                <p>Repo Description</p>
                <p id={'repo_description'}>{ repo.description }</p>
            </div>

            

            {/*TODO: Make comment component below the description*/}
            <div className='add_repo_comments'>
                <form style={{width:'100%',display:'inline-block'}} method="post" onSubmit={handleComment}>
                    <label>
                        <h3>Leave a comment</h3>
                        <textarea style={{maxWidth:'100%', padding:'10px', height:'5rem'}} className="edit_input_2" name="description" type="text" id="new_comment"
                                  placeholder="Show some love, give some feedback, and keep things nice!"/>
                    </label>
                    <br/>
                    <input className="comment_button" type="submit" value="Comment"/>
                </form>
            </div>

            <div className='display_repo_comments'>
                {(comments) ? <CommentsDisplayComponent comments={comments} /> : <h3>No Comment Yet</h3>}
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
