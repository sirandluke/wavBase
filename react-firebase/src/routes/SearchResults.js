import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../View/auth/Auth";
import db from '../model/base';
import UserSearchResults from '../View/components/UserSearchResults';
import RepoSearchResults from '../View/components/RepoSearchResults';

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