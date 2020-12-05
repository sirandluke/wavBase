import React, {useEffect, useState} from "react";
import "../../App.css";
import db from "../../Realtime_Database_config";
import {Link, useHistory, useRouteMatch} from 'react-router-dom';
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";
import PrivateRoute from "../auth/PrivateRoute";
import TestIndividualRepoPage from "./TestIndividualRepoPage";

function Repository(props) {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    const [repos, setRepos] = useState(props.repos || []);

    const uid = db.auth().currentUser.uid;

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
    });

    /*<ul id={'repos_list'}>
        {repos.map((repo, key) => (
            <li>{repo.name}</li>
        ))};
    </ul>*/

    function handleRepoClick(repo_id) {
        history.push("/" + repo_id);
    }

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
                    (repo.user_id === uid) && (repo.is_private !== 'T') ? <RepoDisplayComponent onClick={() => handleRepoClick(repo.key)} id={repo.key} name={repo.name}/> : <></>
                ))}
            </ul>
            {repos && repos.map((repo, key) => (
                <PrivateRoute exact path={"/" + repo.key} component={() => TestIndividualRepoPage(repo.key)}/>
            ))}
        </div>
    );
};

//(repo.user_id === uid) && (repo.is_private !== 'T')

export default Repository;