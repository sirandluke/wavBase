import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';
import {Link, withRouter} from "react-router-dom";
import './RepoSearchResults.css';

class RepoSearchResults extends Component {

    redirectToRepo(curr_repo) {
        this.props.history.push({
            pathname: "/repository",
            state: {  // Pass as props for Repository page.
                repo: curr_repo
            }
        });
    }

    render() {
        console.log(this.props);

        const repoElement = this.props.results.map(repo => 
            <div className="container repo_result">
                <div className="row">
                    <div className="col-sm-12">
                        <button name="repo_links"
                                onClick={ () => this.redirectToRepo(repo) }>
                            { repo.name }
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        Description: {repo.description}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        Tags: {repo.tags}
                    </div>
                </div>
            </div>
        );

        return (
            <div style={{paddingTop: '20px', height:"65%"}}>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>
                    {repoElement}
            </div>

        );
    }
}

export default withRouter(RepoSearchResults);