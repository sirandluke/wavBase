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
        const findMatchingUsers = (query, callback) => {
            const ref = db.database().ref();
            ref.child("users").once("value", (snapshot) => {
                snapshot.forEach((user) => {
                    let uid = user.key;
                    let username = user.child("username").val().toString();
                    if (username.toLowerCase().includes(query.toLowerCase())) {
                        callback(uid);
                    }
                });
            });
        }

        const findMatchingRepos = (query, callback) => {
            const ref = db.database().ref();
            ref.child("repositories").once("value", (snapshot) => {
                snapshot.forEach((user) => {
                    let uid = user.key;
                    let username = user.child("name").val().toString();
                    if (username.toLowerCase().includes(query.toLowerCase())) {
                        callback(uid);
                    }
                });
            });
        }

        const handleSearch = (event) => {
            event.preventDefault();
            const {query} = event.target.elements;
            findMatchingUsers(query.value, collectUserResults);
            findMatchingRepos(query.value, collectRepoResults);
        }

        const collectUserResults = (uid) => {
            
        }

        const collectRepoResults = (uid) => {
            
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