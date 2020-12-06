import React, {useEffect, useState} from "react";
import "../../App.css";
import db from "../../Database_config";
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";
import PrivateRoute from "../auth/PrivateRoute";
import TestIndividualRepoPage from "./TestIndividualRepoPage";

function Repository(props) {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    const [repos, setRepos] = useState(props.repos || []);
    const [user, setUser] = useState(props.user || []);

    const uid = db.auth().currentUser.uid;

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


    const redirectCreateRepo = () => {
        history.push("/newrepo");
    }

    useEffect(() => {
        console.log("fetching repos");
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
                let profile_username = document.getElementById('display_username');
                if (profile_username != null) {
                    profile_username.innerText = user_snapshot.username;
                }

                let follow_info = document.getElementById('follow');
                if (follow_info != null) {
                    let followers = 0;
                    if (user_snapshot.followers !== '') {followers = user_snapshot.followers};
                    let followings = 0;
                    if (user_snapshot.following !== '') {followings = user_snapshot.following};
                    follow_info.innerText = followers + " followers " + followings + " following";
                }

                let bio_info = document.getElementById('bio');
                if (bio_info != null) {
                    let user_bio = 'PROFESSIONALISM';
                    if (user_snapshot.biography !== '') {user_bio = user_snapshot.biography};
                    bio_info.innerText = user_bio;
                }

                db.storage().ref().child(user_snapshot.profile_picture).getDownloadURL().then(function (url) {

                    let img2 = document.getElementById('profile_image');
                    if (img2 != null) {
                        img2.src = url;
                    }
                });
            })
        }

    }, [props.repos, props.user]);

    /*<ul id={'repos_list'}>
        {repos.map((repo, key) => (
            <li>{repo.name}</li>
        ))};
    </ul>*/

    /*function handleRepoClick(repo_id) {
        history.push("/repo?repo_id=" + repo_id);
    }*/

    return (
        <div>
            <img id="profile_image" width={100} height={100}/>
            <h2 id={'display_username'}>username</h2>
            <p id={'follow'}>0 followers 0 following</p>
            <p id={'bio'}>Bio</p>
            <h2>Your Repositories</h2>
            <button onClick={redirectCreateRepo}>Create Repository</button>
            <ul>
                {repos && repos.map((repo, key) => (
                    (repo.user_id === uid) && (repo.is_private !== 'T') ?
                        <RepoDisplayComponent id={repo.key} name={repo.name}/> : <></>
                ))}
            </ul>
        </div>
    );
};

//(repo.user_id === uid) && (repo.is_private !== 'T')

export default Repository;