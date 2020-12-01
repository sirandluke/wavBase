import React, {Component} from "react";
import {insertRepository} from "../../Model/FirebaseHandler";
import * as K from '../../Constants'


const NewRepo = ({ history }) => {

    const createRepo = (event) => {  // Handles creating a new repository.
        event.preventDefault();
        const {
            repo_name,
            bpm,
            key,
            tags,  // TODO: Create tags.
            description
        } = event.target.elements;
        // TODO: Tags query

        if (insertRepository(K.empty, repo_name.value, bpm.value, key.value, description.value)) {  // Call insert repo.
            history.push("/repository");
        }
    }

    return(
        <div>
            <h1>Create Repository</h1>
            <form onSubmit={createRepo}>
                <label>
                    <input name="repo_name" type="text" required="required" placeholder="Repository name" />
                </label>
                <br />
                <label>
                    <input name="bpm" type="number" min="60" max="250" required="required" placeholder="BPM" />
                </label>
                <br />
                <label>
                    <input name="key" type="text" required="required" placeholder="Key Signature" />
                </label>
                <br />
                <label>
                    <input name="tags" type="text" placeholder="Tags" />
                </label>
                <br />
                <label>
                    <textarea name="description" cols="40" rows="5" placeholder="Description">

                    </textarea>
                </label
                ><br />
                <button className="create_button" type="submit">Create</button>
            </form>
        </div>
    );
};

export default NewRepo;