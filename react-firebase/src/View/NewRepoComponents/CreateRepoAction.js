import React, {Component} from 'react';
import {insertRepository} from "../../Model/FirebaseHandler";
import * as K from '../../Constants'
import "../../App.css";
import './CreateRepoAction.css'

export class CreateRepoAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrivate: 'F'
        }
    }

    createRepo = (event) => {  // Handles creating a new repository.
        event.preventDefault();
        const {
            repo_name,
            bpm,
            key,
            tags,  // TODO: Create tags.
            description
        } = event.target.elements;
        // TODO: Tags query
        console.log(this.state.isPrivate)

        if (insertRepository(K.empty, repo_name.value,
            bpm.value, key.value, description.value)) {  // Call insert repo.
            this.props.history.push("/");
        }
        /*
        // TODO: UNCOMMENT LATER
        if (insertRepository(K.empty, repo_name.value,
           bpm.value, key.value, this.state.isPrivate, description.value)) {  // Call insert repo.
            this.props.history.push("/"); */
    }

    handleCheck = (e) => {
        this.setState({isPrivate: this.state.isPrivate === 'F' ? 'T' : 'F'});
    }

    render() {
        return(
            <div>
                <form className="make_repo_form" onSubmit={this.createRepo}>
                    <h1>Create Repository</h1>
                    <label>
                        <input className="repo_Name" name="repo_name" type="text" required="required" placeholder="Repository name" />
                    </label>
                    <br />
                    <label>
                        <input className="BPM" name="bpm" type="number" min="60" max="250" required="required" placeholder="BPM" />
                    </label>
                    <br />
                    <label>
                        <input className="Name" name="key" type="text" required="required" placeholder="Key Signature" />
                    </label>
                    <br />
                    <label>
                        <input className="Tags" name="tags" type="text" placeholder="Tags" />
                    </label>
                    <br />
                    <label>
                        Make repository Private
                        <input type="checkbox" name="isPrivate" onChange={this.handleCheck}/>
                    </label>
                    <br />
                    <label>
                        <textarea name="description" cols="40" rows="5" placeholder="Description">

                        </textarea>
                    </label>
                    <br />
                    <button className="create_button" type="submit">Create</button>
                </form>
            </div>
        );
    }
}