import React, {Component} from "react";
import "../../App.css";
import {PlayButton} from "../../Model/PlayButton";
import db from "../../Model/base";
import {HashRouter, NavLink, Router} from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import IndividualRepository from "./IndividualRepository";
import * as FirebaseHandler from "../../Model/FirebaseHandler";
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";

export const audioSource = 'https://firebasestorage.googleapis.com/v0/b/wavbasedb-9a679.appspot.com/o/test_audio%2Ftest_piano.mp3?alt=media&token=e3dce63f-0aab-4d68-be39-39893c759e8e';
let repo_links = [];
let repo_paths = [];
export const repo_page_path = () => (
    {repo_paths}
)

const Repository = () => {

    repo_links = [];
    repo_paths = [];
    const uid = db.auth().currentUser.uid;
    let repo_ref = db.database().ref().child('repositories');
    repo_ref.orderByChild('user_id').equalTo(uid).on('value', (snapshot) => {
        snapshot.forEach((entry) => {
            repo_paths.push('/' + entry.key);
            repo_links.push(
                <RepoDisplayComponent id={entry.key} name={entry.val().name}></RepoDisplayComponent>
            );
            repo_paths.push(
                <PrivateRoute exact path={'/' + entry} component={() => IndividualRepository(entry)}/>
            );
            console.log(entry.key);
        });
    })

    return (
        <div>
            <HashRouter>
                <button><NavLink to='/newrepo'>Create Repository</NavLink></button>
                <div>
                </div>
            </HashRouter>
            <ul>
                <li>Repositories</li>
                <div>{repo_links}</div>
                <li>Likes</li>
            </ul>
        </div>
    );
};

export default Repository;