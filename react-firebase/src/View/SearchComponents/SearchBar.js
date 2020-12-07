import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import {Link, withRouter} from "react-router-dom";
import db from '../../Model/base';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            userResults: [],
            repoResults: []
        }
    }

    async findMatchingUsers(query, callback){
        let results = [];

        const ref = db.database().ref();
        const storageRef = db.storage().ref();
        await ref.child("users").once("value", (snapshot) => {
            snapshot.forEach((user) => {
                let uid = user.key;
                let username = user.child("username").val().toString();
                if (username.toLowerCase().includes(query.toLowerCase())) {
                    let userdata = user.val();
                    userdata.uid = uid;

                    results.push(userdata);
                }
            });
            callback(results);
        });
    }

    findMatchingRepos(query, callback){
        let results = [];

        const ref = db.database().ref();
        ref.child("repositories").once("value", (snapshot) => {
            snapshot.forEach((repo) => {
                let repo_id = repo.key;
                let reponame = repo.child("name").val().toString();
                if (reponame.toLowerCase().includes(query.toLowerCase()) &&
                    repo.child("is_private").val() !== 'T') {
                    let repodata = repo.val();
                    repodata.repo_id = repo_id;
                    results.push(repodata);
                }
            });
            callback(results);
        });
    }

    handleSearch(event){
        event.preventDefault();
        const {query} = event.target.elements;
        this.findMatchingUsers(query.value, (uresults)=>{
            let newState = this.state;
            newState.userResults = uresults;
            this.setState(newState);

            this.findMatchingRepos(query.value, (rresults)=>{
                let newState = this.state;
                newState.repoResults = rresults;
                this.setState(newState);

                //redirect to search results page
                this.props.history.push({
                    pathname: "/search",
                    state: {  // pass as props for search results page
                        userResults: this.state.userResults,
                        repoResults: this.state.repoResults
                    }
                });
            });
        });

    }

    render() {
        return(
            <div>
                <form onSubmit={(e) => {this.handleSearch(e)}}>
                    <label>
                        <input type="text" name="query" placeholder="search" />
                    </label>
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchBar);