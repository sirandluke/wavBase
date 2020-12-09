import React, {useEffect, useState} from "react";
//import db from "../../Database_config";
//import {RepoDisplayComponent} from "../SearchResultsComponents(zhifei)/RepoDisplayComponent";
import {FindRepos} from "../../BackendFunctions";
import db from "../../Model/TODELETE_base";
import {useHistory} from "react-router";

function RepoSearchResult(props) {

    const history = useHistory();
    let search_input = document.getElementById('search_input').value;

    const uid = db.auth().currentUser.uid;
    const [repos, setRepos] = useState(0);

    useEffect(() => {
        console.log('listen to repo list');
        if (!repos) {
            FindRepos(uid)
                .then(repos_snapshot => {
                    let repos_list = [];
                    for (let repo in repos_snapshot) {
                        repos_list.push({...repos_snapshot[repo], repo_id: repo});
                    }
                    setRepos(repos_list);
                });
        }
        return () => {
            console.log('stop listen to repo list');
        }
    }, [repos]);

    const redirectToRepo = (curr_repo) => {
        history.push({
            pathname: "/repo/" + curr_repo.repo_id,
            state: {  // Pass as props for Repository page.
                repo: curr_repo
            }
        });
    }

    let repoElement = [];
    if (repos) {
        repoElement = repos.map((repo, key) => (
            (repo.name.toLowerCase().includes(search_input.toLowerCase())) && ((repo.user_id === uid) || (repo.is_private !== 'T' && repo.user_id !== uid)) ?
                <tr key={ repo.repo_id }>
                    <td style={ {width: '200px', textAlign: 'left'} }>
                        <button className="repo_button" name="repo_links"
                                onClick={ () => redirectToRepo(repo) }>
                            { repo.name }
                        </button>
                    </td>
                </tr> : <></>
        ))
    }

    return (
        <div>
            <h2>Repo Search Result</h2>
            <ul>
                {/*{repos && repos.map((repo, key) => (
                    (repo.name.toLowerCase().includes(search_input.toLowerCase())) && ((repo.user_id === uid) || (repo.is_private !== 'T' && repo.user_id !== uid)) ?
                        <RepoDisplayComponent key={key} id={repo.repo_id} name={repo.name}/> : <></>
                ))}*/}
                {repoElement}
            </ul>
        </div>
    );
}

export default RepoSearchResult;