import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';
import {Link, withRouter} from "react-router-dom";
import UserSearchResults from "../SearchComponents/UserSearchResults";
import RepoSearchResults from "../SearchComponents/RepoSearchResults";
class SearchResults extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);

        this.handleChange = this.handleChange.bind(this);
        this.getCategoryResults = this.getCategoryResults.bind(this);

        this.state = {
            category: "users",
            resultsHTML: <UserSearchResults results={this.props.location.state.userResults}/>
        }
    }

    handleChange(event) {
        let newState = this.state;
        newState.category = event.target.value;
        this.setState(newState);
        newState.resultsHTML = this.getCategoryResults();
        this.setState(newState);
    }

    getCategoryResults() {
        if(this.state.category === "users") {
            return (<UserSearchResults results={this.props.location.state.userResults}/>);
        } else if (this.state.category === "repos") {
            return (<RepoSearchResults results={this.props.location.state.repoResults}/>);
        } else {
            return (<p>No Results</p>);
        }
    }

    render() {

        return(
            <div>
                <select onChange={this.handleChange}>
                    <option selected value="users">Users</option>
                    <option  value="repos">Repositories</option>
                </select>
                {this.state.resultsHTML}
            </div>
        );
    }
}

export default withRouter(SearchResults);