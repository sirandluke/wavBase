import React, {useEffect, useState} from "react";
//import db from "../../Database_config";
import {RepoDisplayComponent} from "../SearchResultsComponents(zhifei)/RepoDisplayComponent";
import {findRepos} from "../../BackendFunctions";
import db from "../../Model/TODELETE_base";

function RepoSearchResult(props) {

    let search_input = document.getElementById('search_input').value;

    const uid = db.auth().currentUser.uid;
    const [repos, setRepos] = useState(0);

    useEffect(() => {
        console.log('listen to repo list');
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
            console.log('stop listen to repo list');
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