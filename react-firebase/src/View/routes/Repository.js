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
import {treeFilter} from "enzyme/src/RSTTraversal";

function Repository(props) {
    const history = useHistory();
    const [repos, setRepos] = useState(props.repos || []);
    const [user, setUser] = useState(props.user || []);
    //const [user, setUser] = useState(0);

    const {user_id} = useParams();

    let current_uid = db.auth().currentUser.uid;
    let uid = current_uid;
    if (user_id != null) {
        uid = user_id;
    }
    console.log('Entering', uid + "'s repo page");

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
        //if (localStorage.getItem('repo_page_id') !== uid) {
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
        if (!props.user) {
            getUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
                let profile_username = document.getElementById(uid + 'display_username');
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

                let img2 = document.getElementById(uid + 'profile_image');
                if (img2 != null) {
                    img2.src = image_url;
                }

                let bio_info = document.getElementById(uid + 'bio');
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

        //localStorage.setItem('repo_page_id', uid);
        //}
        return () => {
            if (document.getElementById(uid + 'followers popup')) {
                //document.getElementById(uid + 'followers popup').open=false;
            }
            if ( document.getElementById(uid + 'following popup')) {
                //document.getElementById(uid + 'following popup').open=false;
            }
            console.log('stop listen to repository');
        }

    }, [props.repos, props.user, useParams()]);

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


    return (
        <div>
            <img id={uid + "profile_image"} width={100} height={100}/>
            <h2 id={uid + 'display_username'}>username</h2>
            <Popup id={uid + 'followers popup'} trigger={<button id={uid + 'followers button'}>{getIdCount(user.followers)} followers</button>}
                   position={'right center'}>
                <FollowersPopUp id={uid}/>
            </Popup>
            <Popup id={uid + 'following popup'} trigger={<button id={uid + 'following button'}>{getIdCount(user.following)} following</button>}
                   position={'right center'} >
                <FollowingPopUp id={uid}/>
            </Popup>
            <br/>
            {((uid !== current_uid) && (!IncludeId(user.followers, current_uid))) ?
                <button onClick={handleFollow}>Follow</button> : <></>}
            {((uid !== current_uid) && (IncludeId(user.followers, current_uid))) ?
                <button onClick={handleUnfollow}>Unfollow</button> : <></>}
            <p id={uid + 'bio'}>Bio</p>
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