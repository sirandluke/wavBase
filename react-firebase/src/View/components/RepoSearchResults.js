import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';
import {Link, withRouter} from "react-router-dom";

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
            <div>
                <tr key={ repo.repo_id }>
                    <td style={ {width: '200px', textAlign: 'left'} }>
                        <button className="repo_button" name="repo_links"
                                onClick={ () => this.redirectToRepo(repo) }>
                            { repo.name }
                        </button>
                    </td>
                </tr>
                <tr>
                    <td style={ {width: '200px', textAlign: 'left'} }>
                        Description: {repo.description}
                    </td>
                </tr>
                <tr>
                    Tags: {repo.tags}
                </tr>
            </div>
        );

        return (
            <div style={{paddingTop: '20px', overflowY:'scroll', height:"65%"}}>
                {/* <table style={{border: '1px solid blue'}}> */}
                <table>
                    <thead>
                    {/* <tr>
                        <th style={{textAlign:"left"}}>Your Repositories</th>
                    </tr> */}
                    </thead>
                    <tbody>
                        { repoElement }
                    </tbody>
                </table>
            </div>

        );
    }
}

export default withRouter(RepoSearchResults);