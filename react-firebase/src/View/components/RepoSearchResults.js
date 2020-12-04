import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../model/base';

class RepoSearchResults extends Component {

    render() {

        return(
            <div>
                <h2>Repository Search Results</h2>
                <ul>
                    {this.props.results.map((result) => {
                        <li>{result}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default RepoSearchResults;