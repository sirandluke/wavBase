import React, {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ResultsInterface(props) {

    //const [search_input, set_search_input] = useState(0);
    //set_search_input(document.getElementById('search_input').value);


    //performs callback on array of UIDs with repository names containing the search query
    /*function findMatchingRepos(value, query, callback) {
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
        //console.log(uids);
        uids.forEach((id) => {
            user_results.push(
                <button>{id.val().username}</button>
            );
        });
    }*/


    //user_results = [];
    //repo_results = [];
    //tags_results = [];

    //findMatchingUsers(search_input, getUsers);

    /*function getReposByName(rids) {
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
    findMatchingRepos('tags', search_input, getReposByTags);*/

    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Options">
                <Dropdown.Item as="button"><Link to='/search_result'>Users</Link></Dropdown.Item>
                <Dropdown.Item as="button"><Link
                    to='/search_result/repositories'>Repositories</Link></Dropdown.Item>
                <Dropdown.Item as="button"><Link to='/search_result/tags'>Tags</Link></Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default ResultsInterface;