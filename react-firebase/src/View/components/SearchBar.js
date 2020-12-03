import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userResults: [],
            repoResults: []
        }
    }

    render() {
        //performs callback on array of UIDs with usernames containing the search query
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

        const handleSearch = (event) => {
            event.preventDefault();
            const {query} = event.target.elements;
            findMatchingUsers(query.value, ()=>{}); //add functionality to generate 
            findMatchingRepos(query.value, ()=>{});
        }

        return(
            <div>
                <form onSubmit={handleSearch}>
                    <label>
                        <input type="text" name="query"></input>
                    </label>
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBar;