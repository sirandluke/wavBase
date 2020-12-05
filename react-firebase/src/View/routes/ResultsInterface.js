import React from "react";
import db from "../../Realtime_Database_config";
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";
import {ParseTags} from "../../model/ParseTags";
import {HashRouter, NavLink} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PrivateRoute from "../auth/PrivateRoute";
import Repository from "./Repository";
import Profile from "./Profile";
import NewRepo from "./NewRepo";
import SearchResultWithOptions from "../components/SearchResultWithOptions";
import logo from "../../Images/wavBase_logo.png";
import {search_input} from "./PersonalHome";

let user_results = [];
let repo_results = [];
let tags_results = [];

/*export const search_result_paths = () => (
    <div>
        <PrivateRoute exact path='/search_result' component={() => SearchResultWithOptions('User', user_results)}/>
        <PrivateRoute exact path='/search_result/repositories'
                      component={() => SearchResultWithOptions('Repositories', repo_results)}/>
        <PrivateRoute exact path='/search_result/tags'
                      component={() => SearchResultWithOptions('Tags', tags_results)}/>
    </div>
);*/

const ResultsInterface = ({history}) => {

    function findMatchingUsers(query, callback) {
        let uids = [];
        const ref = db.database().ref();
        ref.child("users").on("value", (snapshot) => {
            snapshot.forEach((user) => {
                let uid = user.key;
                let username = user.val().username;
                if (username.toLowerCase().includes(query.toLowerCase())) {
                    uids.push(user);
                }
            });
        });
        callback(uids);
    }

    //performs callback on array of UIDs with repository names containing the search query
    function findMatchingRepos(value, query, callback) {
        let rids = [];
        const ref = db.database().ref();
        ref.child('repositories').on("value", (snapshot) => {
            snapshot.forEach((repo) => {
                let rid = repo.key;
                let isValid = false;
                if (value === 'repositories') {
                    let reponame = repo.val().name;
                    if (reponame.toLowerCase().includes(query.toLowerCase())) {
                        console.log("repo_name = " + rid);
                        isValid = true;
                    }
                } else if (value === 'tags') {
                    let repo_tags = repo.val().tags;
                    let tag = ParseTags(repo_tags);
                    if (tag.includes(query)) {
                        console.log("tags = " + rid);
                        isValid = true;
                    }
                }
                let is_private = repo.val().is_private;
                if (is_private === 'T') {
                    isValid = false;
                }
                if (isValid) {
                    rids.push(repo);
                }
            });
        });
        callback(rids);
    }

    function getUsers(uids) {
        uids.forEach((id) => {
            user_results.push(
                <button>{id.val().username}</button>
            );
        });
    }

    user_results = [];
    repo_results = [];
    tags_results = [];

    findMatchingUsers(search_input, getUsers);

    function getReposByName(rids) {
        //console.log(rids);
        rids.forEach((id) => {
            console.log("Found repo: " + id);
            repo_results.push(
                <RepoDisplayComponent id={id.key} name={id.val().name}/>
            );
        });
    }

    function getReposByTags(rids) {
        console.log(rids);
        rids.forEach((id) => {
            console.log("Found repo: " + id);
            tags_results.push(
                <RepoDisplayComponent id={id.key} name={id.val().name}/>
            );
        });
    }

    findMatchingRepos('repositories', search_input, getReposByName);
    findMatchingRepos('tags', search_input, getReposByTags);

    /*return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Options">
                <Dropdown.Item as="button"><NavLink to='/search_result'>Users</NavLink></Dropdown.Item>
                <Dropdown.Item as="button"><NavLink to='/search_result/repositories'>Repositories</NavLink></Dropdown.Item>
                <Dropdown.Item as="button"><NavLink to='/search_result/tags'>Tags</NavLink></Dropdown.Item>
            </DropdownButton>
        </div>
    );*/
    return (
        <div>
            <div>
                <h2>User Search Results</h2>
                {user_results}
            </div>
            <div>
                <h2>Repository Search Results</h2>
                {repo_results}
            </div>
            <div>
                <h2>Tags Search Results</h2>
                {tags_results}
            </div>
        </div>
    );
}

export default ResultsInterface;