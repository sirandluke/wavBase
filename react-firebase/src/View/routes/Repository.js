import React, {useEffect, useState} from "react";
import "../../App.css";
import db from "../../Database_config";
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";
import PrivateRoute from "../auth/PrivateRoute";
import TestIndividualRepoPage from "../components/TestIndividualRepoPage";
import {AddId, DeleteId, getIdCount, IncludeId} from "../../components/ParseId";
import Popup from "reactjs-popup";
import FollowersPopUp from "../components/FollowersPopUp";
import FollowingPopUp from "../components/FollowingPopUp";

function Repository(props) {
    const history = useHistory();
    const [repos, setRepos] = useState(props.repos || []);
    //const [user, setUser] = useState(props.user || []);
    const [user, setUser] = useState(0);

    const {user_id} = useParams();

    let current_uid = db.auth().currentUser.uid;
    let uid = current_uid;
    if (user_id != null) {
        uid = user_id;
    }

    const getUserRef = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_info?current_uid=' + uid, config)
            .then(response => response.json())
            .catch(error => console.log("Home page " + error));
    }

    const findRepos = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/repo_list?uid=' + uid, config)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    const updateFollow = (uid, current_uid, type) => {
        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid, current_uid, type
            })
        };
        fetch('http://localhost:8000/user_info/follow?uid=' + uid, config)
            .catch(error => console.log(error));
    }

    useEffect(() => {
        console.log('listen to repository');
        if (!props.repos) {
            findRepos(uid)
                .then(repos_snapshot => {
                    let repos_list = [];
                    for (let repo in repos_snapshot) {
                        repos_list.push({...repos_snapshot[repo], key: repo});
                    }
                    setRepos(repos_list);
                });
        }
        if (!user) {
            getUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
                let profile_username = document.getElementById('display_username');
                if (profile_username != null) {
                    profile_username.innerText = user_snapshot.username;
                }

                let image_path = "defaults/test_user.png";
                if (user_snapshot.profile_picture !== '') {
                    image_path = user_snapshot.profile_picture;
                }
                let image_url;
                if (localStorage.getItem(image_path)) {
                    image_url = localStorage.getItem(image_path);
                } else {
                    db.storage().ref().child(image_path).getDownloadURL().then(function (url) {
                        image_url = url;
                        localStorage.setItem(image_path, url);
                    });
                }

                let img2 = document.getElementById('profile_image');
                if (img2 != null) {
                    img2.src = image_url;
                }

                let bio_info = document.getElementById('bio');
                if (bio_info != null) {
                    let user_bio = 'PROFESSIONALISM';
                    if (user_snapshot.biography !== '') {
                        user_bio = user_snapshot.biography
                    }
                    ;
                    bio_info.innerText = user_bio;
                }
            })
        }
        return () => {
            console.log('stop listen to repository');
        }

    }, [props.repos, user]);

    const handleFollow = () => {
        updateFollow(uid, current_uid, 'follow');
        let tmp_user = user;
        let tmp_followers = AddId(tmp_user.followers, current_uid);
        tmp_user = {...tmp_user, followers: tmp_followers};
        localStorage.setItem('following', AddId(localStorage.getItem('following'), uid));
        setUser(tmp_user);
    }

    const handleUnfollow = () => {
        updateFollow(uid, current_uid, 'unfollow');
        let tmp_user = user;
        let tmp_followers = DeleteId(tmp_user.followers, current_uid);
        tmp_user = {...tmp_user, followers: tmp_followers}
        localStorage.setItem('following', DeleteId(localStorage.getItem('following'), uid));
        setUser(tmp_user);
    }

    function handleFollowUpdate() {

    }


    return (
        <div>
            <img id="profile_image" width={100} height={100}/>
            <h2 id={'display_username'}>username</h2>
            <Popup trigger={<button id={current_uid + 'followers'}>{getIdCount(user.followers)} followers</button>}
                   onClose={handleFollowUpdate} position={'right center'}>
                <FollowersPopUp id={uid}/>
            </Popup>
            <Popup trigger={<button id={current_uid + 'following'}>{getIdCount(user.following)} following</button>}
                   onClose={handleFollowUpdate} position={'right center'}>
                <FollowingPopUp id={uid}/>
            </Popup>
            <br/>
            {((uid !== current_uid) && (!IncludeId(user.followers, current_uid))) ?
                <button onClick={handleFollow}>Follow</button> : <></>}
            {((uid !== current_uid) && (IncludeId(user.followers, current_uid))) ?
                <button onClick={handleUnfollow}>Unfollow</button> : <></>}
            <p id={'bio'}>Bio</p>
            {(uid === current_uid) ? <h2>Your Repositories</h2> : <h2>This User's Repositories</h2>}
            {(uid === current_uid) ? <button><Link to={'/newrepo'}>Create Repository</Link></button> : <></>}
            <ul>
                {repos && repos.map((repo, key) => (
                    (repo.user_id === uid) && ((uid === current_uid) || (repo.is_private !== 'T' && uid !== current_uid)) ?
                        <RepoDisplayComponent key={key} id={repo.key} name={repo.name}/> : <></>
                ))}
            </ul>
        </div>
    );
};

export default Repository;