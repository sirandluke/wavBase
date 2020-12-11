//TODO: Deprecated
/*
import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/TODELETE_base';
import {Link, withRouter} from "react-router-dom";
import UserSearchResults from "../TODELETE_SearchComponents/UserSearchResults";
import RepoSearchResults from "../TODELETE_SearchComponents/RepoSearchResults";
import NavBar from '../NavBarComponents/NavBar';
import './SearchResults.css';

class SearchResults extends Component {
    constructor(props, history) {
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
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>
                <NavBar />
                <div className="container results_container">
                    <div className="row">
                        <div className="col-sm-10"></div>
                        <div className="col-sm-2 filter_box">
                            Filters:&nbsp; &nbsp;
                            <select onChange={this.handleChange}>
                                <option selected value="users">Users</option>
                                <option  value="repos">Repositories</option>
                            </select>
                        </div>
                    </div>
                    {this.state.resultsHTML}
                </div>
            </div>
        );
    }
}

export default withRouter(SearchResults);*/
