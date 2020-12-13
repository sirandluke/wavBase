import React, {Component, useEffect, useState} from 'react';
import "../../App.css";
import './CreateRepoAction.css'
import privateLock from "../../Images/private.png";
import publicGlobe from "../../Images/public.png";
import db from "../../Model/base";
import {CreateRepo} from "../../BackendFunctions";
import {useHistory} from "react-router";

let name = "User";

export function CreateRepoAction(props) {
    const history = useHistory();
    let isPrivate = 'F';
    const username = localStorage.getItem('username');
    const uid = localStorage.getItem('current_uid');
    console.log(uid, 'is creating new repo');


    const createRepo = (event) => {  // Handles creating a new repository.
        event.preventDefault();
        const {
            repo_name,
            bpm,
            key,
            tags,  // TODO: Create tags.
            description
        } = event.target.elements;
        console.log(isPrivate);


        CreateRepo(uid, repo_name.value,
            bpm.value, key.value, tags.value, isPrivate, description.value);
        history.push("/");
    }


    const handleCheck = (e) => {
        if (isPrivate === 'T') {
            isPrivate = 'F';
            console.log('The repo is now set to be public');
            document.getElementById('public_checkbox').checked = true;
            document.getElementById('private_checkbox').checked = false;
        } else {
            isPrivate = 'T';
            console.log('The repo is now set to be private');
            document.getElementById('public_checkbox').checked = false;
            document.getElementById('private_checkbox').checked = true;
        }
    }

    return (
        <div>
            <h2>create repo</h2>
            <form className="make_repo_form" onSubmit={createRepo}>
                <h1>Create Repository</h1>
                <div className="topPart">
                    <label className="name_box">
                        <b1>{username}</b1>
                    </label>
                    <label>
                        <input className="repoName_input" name="repo_name" type="text" required="required" placeholder="Repository Name"/>
                    </label>
                </div>
                <br/>
                <div className="public_option">
                    <input id='public_checkbox' type="checkbox" checked={true} onChange={handleCheck}/>
                    <b2>Public</b2>
                    <img src={publicGlobe} className={"public_globe"} />
                </div>
                <div className="private_option" >
                    <input id='private_checkbox' type="checkbox" name="isPrivate" onChange={handleCheck}/>
                    <b2>Private</b2>
                    <img src={privateLock} className={"private_globe"} />
                </div>
                <br />
                <div className="mainpart_input">
                    <label>
                        <input className="createRepo_input" name="bpm" type="number" min="60" max="250" required="required" placeholder="BPM"/>
                    </label>
                    <br />
                    <label>
                        <input className="createRepo_input" name="key" type="text" required="required" placeholder="Key Signature"/>
                    </label>
                    <br />
                    <label>
                        <input className="createRepo_input" name="tags" type="text" placeholder="Tags - Separate them with ,"/>
                    </label>
                    <br />
                    <label>
                            <textarea name="description" cols="40" rows="5" placeholder="Description" >

                           </textarea>
                    </label>
                    <br />
                    <button className="create_button" type="submit">Create</button>
                </div>


            </form>
        </div>
    );
}

/*
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

       /!* if (insertRepository(K.empty, repo_name.value,
            bpm.value, key.value, description.value)) {  // Call insert repo.
            this.props.history.push("/");
        }*!/

        /!*if (insertRepository(K.empty, repo_name.value,
           bpm.value, key.value, this.state.isPrivate, description.value)) {  // Call insert repo.
            this.props.history.push("/"); *!/
        CreateRepo(tags, repo_name.value,
            bpm.value, key.value, this.state.isPrivate, description.value);
        this.props.history.push("/");
    }

    handleCheck = (e) => {
        this.setState({isPrivate: this.state.isPrivate === 'F' ? 'T' : 'F'});
    }

    /!*username = () => {
        let user = db.auth().currentUser;
        //let name, email, photoUrl, uid, emailVerified;
        let username
        if (user != null) {
            //name = user.email;

            let uid = db.auth().currentUser.uid;
            let firebaseRef = db.database().ref('users/' + uid);
            firebaseRef.on('value', (snapshot) =>{
                username = snapshot.val().username;
                name = username;
            })
        }
    }*!/



    render() {
        this.username();
        return(
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <form className="make_repo_form" onSubmit={this.createRepo}>
                    <h1>Create Repository</h1>
                    <div className="topPart">
                        <label className="name_box">
                            <b1>{name}</b1>
                        </label>
                        <label>
                            <input className="repoName_input" name="repo_name" type="text" required="required" placeholder="Repository Name"/>
                        </label>
                    </div>
                    <br/>
                        <div className="public_option">
                            <input type="checkbox" />
                            <b2>Public</b2>
                            <img src={publicGlobe} className={"public_globe"} />
                        </div>
                        <div className="private_option" >
                            <input type="checkbox" name="isPrivate" onChange={this.handleCheck}/>
                            <b2>Private</b2>
                            <img src={privateLock} className={"private_globe"} />
                        </div>
                    <br />
                    <div className="mainpart_input">
                        <label>
                            <input className="createRepo_input" name="bpm" type="number" min="60" max="250" required="required" placeholder="BPM"/>
                        </label>
                        <br />
                        <label>
                            <input className="createRepo_input" name="key" type="text" required="required" placeholder="Key Signature"/>
                        </label>
                        <br />
                        <label>
                            <input className="createRepo_input" name="tags" type="text" placeholder="Tags - Separate them with ,"/>
                        </label>



                       <br />
                       <label>
                            <textarea name="description" cols="40" rows="5" placeholder="Description" >

                           </textarea>
                        </label>
                        <br />
                        <button className="create_button" type="submit">Create</button>
                    </div>


                </form>

            </div>
        );
    }
}*/
