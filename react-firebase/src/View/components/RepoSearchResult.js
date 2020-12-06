import React, {useEffect, useState} from "react";
import {search_input} from "../routes/PersonalHome";
import {RepoDisplayComponent} from "./RepoDisplayComponent";
import db from "../../Database_config";

function RepoSearchResult(props) {
    /*const [users, setUsers] = useState(props.users || []);
    let search_input = search_input;

    const findUsers = () => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_list', config)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (!props.users) {
            findUsers().then(users_snapshot => {
                let users_list = [];
                for (let user in users_list) {
                    users_list.push({...users_snapshot[user], key: user});
                }
                setUsers(users_list);
            });
        }
    });

    return (
        <div>
            <h2>User Search Result</h2>
            <ul>
                {users && users.map((user, key) => (
                    (user.val().username.toLowerCase().includes(search_input.toLowerCase())) ? <button>{user.val().username}</button> : <></>
                ))}
            </ul>
        </div>
    );*/
    let search_input = document.getElementById('search_input').value;

    const uid = db.auth().currentUser.uid;
    const [repos, setRepos] = useState(0);

    const findRepos = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/repo_list?uid=' + uid, config)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    useEffect(() => {
        console.log("fetching repos");
        if (!repos) {
            findRepos(uid)
                .then(repos_snapshot => {
                    let repos_list = [];
                    for (let repo in repos_snapshot) {
                        repos_list.push({...repos_snapshot[repo], key: repo});
                    }
                    setRepos(repos_list);
                });
        }

    }, [repos]);

    return (
        <div>
            <h2>Repo Search Result</h2>
            <ul>
                {repos && repos.map((repo, key) => (
                    (repo.name.toLowerCase().includes(search_input.toLowerCase())) && ((repo.user_id === uid) || (repo.is_private !== 'T' && repo.user_id !== uid)) ?
                        <RepoDisplayComponent key={key} id={repo.key} name={repo.name}/> : <></>
                ))}
            </ul>
        </div>
    );
}

export default RepoSearchResult;