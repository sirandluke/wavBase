import React from "react";
import UserSearchResults from '../components/UserSearchResults';
import RepoSearchResults from '../components/RepoSearchResults';
import db from "../../Model/base";

const ResultsInterface = (search_input) => {

    const findMatchingUsers = (query, callback) => {
        let uids = [];
        const ref = db.database().ref();
        ref.child("users").once("value", (snapshot) => {
            snapshot.forEach((user) => {
                let uid = user.key;
                let username = user.child("username").val().toString();
                if (username.toLowerCase().includes(query.toLowerCase())) {
                    uids.push(uid);
                }
            });
        });
        callback(uids);
    }

    //performs callback on array of UIDs with repository names containing the search query
    const findMatchingRepos = (query, callback) => {
        let rids = []
        const ref = db.database().ref();
        ref.child("repositories").once("value", (snapshot) => {
            snapshot.forEach((repo) => {
                let rid = repo.key;
                let reponame = repo.child("name").val().toString();
                if (reponame.toLowerCase().includes(query.toLowerCase())) {
                    rids.push(rid)
                }
            });
        });
        callback(rids)
    }

    return (
        <div>
            <Results input={search_input}/>
        </div>
    );
}

export function Results(props) {
    /*let result_list = [];
    props.results.forEach((entry) => {
        result_list.push(
            <button>{entry}</button>
        );
    });*/

    return (
        <div>
            <h2>{props.input}</h2>
        </div>
    );

}

export default ResultsInterface;