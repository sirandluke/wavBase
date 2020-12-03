import React from "react";
import db from "../../Model/base";
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";

const ResultsInterface = (search_input) => {

    function findMatchingUsers(query, callback) {
        let uids = [];
        const ref = db.database().ref();
        ref.child("users").on("value", (snapshot) => {
            snapshot.forEach((user) => {
                let uid = user.key;
                let username = user.child("username").val().toString();
                if (username.toLowerCase().includes(query.toLowerCase())) {
                    uids.push(user);
                }
            });
        });
        callback(uids);
    }

    //performs callback on array of UIDs with repository names containing the search query
    function findMatchingRepos(query, callback) {
        let rids = [];
        const ref = db.database().ref();
        ref.child("repositories").on("value", (snapshot) => {
            snapshot.forEach((repo) => {
                let rid = repo.key;
                let reponame = repo.child("name").val().toString();
                if (reponame.toLowerCase().includes(query.toLowerCase())) {
                    rids.push(repo);
                }
            });
        });
        callback(rids);
    }

    let user_results = [];
    let repo_results = [];
    /*const storage_ref = db.database().ref();
    const users_ref = storage_ref.child('users/');
    const repos_ref = storage_ref.child('repositories/');
    users_ref.child("users").on("value", (snapshot) => {
        snapshot.forEach((user) => {
            console.log(user.key);
            let uid = user.key;
            let username = user.child("username").val().toString();
            if (username.toLowerCase().includes(search_input.toLowerCase())) {
                user_results.push(
                    <li>{uid}</li>
                );
            }
        });
    });

    repos_ref.child("repositories").on("value", (snapshot) => {
        snapshot.forEach((repo) => {
            let rid = repo.key;
            let repo_name = repo.child("name").val().toString();
            if (repo_name.toLowerCase().includes(search_input.toLowerCase())) {
                repo_results.push(
                    <li>{rid}</li>
                );
            }
        });
    });*/


    function getUsers(uids) {
        console.log(uids);
        uids.forEach((id) => {
            user_results.push(
                <button>{id.val().username}</button>
            );
        });
    }

    findMatchingUsers(search_input, getUsers);

    function getRepos(rids) {
        console.log(rids);
        rids.forEach((id) => {
            console.log("Found repo: " + id);
            repo_results.push(
                <RepoDisplayComponent id={id.key} name={id.val().name}/>
            );
        });
    }

    findMatchingRepos(search_input, getRepos);


    return (
        <div>
            <h2>User Search Results</h2>
            <div>
                {user_results}
            </div>
            <br />
            <h2>Repository Search Results</h2>
            <div>
                {repo_results}
            </div>
        </div>
    );
}

export default ResultsInterface;