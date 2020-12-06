import React, {useEffect, useState} from "react";
import db from "../../Database_config";
import {RepoDisplayComponent} from "./RepoDisplayComponent";
import {ParseTags} from "../../components/ParseTags";


function TagsSearchResult(props) {
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
        console.log('listen to tags list');
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
        return () => {
            console.log('stop listen to tags list');
        }
    }, [repos]);

    return (
        <div>
            <h2>Tags Search Result</h2>
            <ul>
                {repos && repos.map((repo, key) => (
                    (ParseTags(repo.tags).includes(search_input)) && ((repo.user_id === uid) || (repo.is_private !== 'T' && repo.user_id !== uid)) ?
                        <RepoDisplayComponent key={key} id={repo.key} name={repo.name}/> : <></>
                ))}
            </ul>
        </div>
    );
}
export default TagsSearchResult;
