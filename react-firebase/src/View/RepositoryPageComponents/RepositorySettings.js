/*
import React from "react";
import {useHistory, useParams} from "react-router";
import {DeleteRepo, UpdateRepoInfo} from "../../BackendFunctions";

function RepositorySettings(props) {
    const history = useHistory();
    const {repo_id} = useParams();

    const handleRepoInfoUpdate = (event) => {
        event.preventDefault();
        let new_tags = document.getElementById('new_tags').value;
        let new_description = document.getElementById('new_description').value;
        UpdateRepoInfo(repo_id, new_tags, new_description);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        DeleteRepo(repo_id);
        history.push('/');
    }

    const redirectToRepoHomePage = (event) => {
        event.preventDefault();
        history.push(`/repo/${repo_id}`);
    }

    return (
        <div>
            <button onClick={redirectToRepoHomePage}>Back To Snapshot List</button>
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
        </div>
    );
}

export default RepositorySettings;*/
