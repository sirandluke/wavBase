import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';
import UserSearchResults from '../components/UserSearchResults';
import RepoSearchResults from '../components/RepoSearchResults';

class SearchResults extends Component {

    render() {

        return(
            <div>
                <UserSearchResults />
                <RepoSearchResults />
            </div>
        );
    }
}

export default SearchResults;