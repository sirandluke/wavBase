import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';
import {Link, withRouter} from "react-router-dom";
import './UserSearchResults.css';

class UserSearchResults extends Component {
    constructor(props) {
        super(props);
    }

    redirectToUser(curr_user) {
        this.props.history.push({
            pathname: "/user",
            state: {  // Pass as props for user page.
                uid: curr_user
            }
        });
    }

    render() {

        const repoElement = this.props.results.map(user =>
            <div className="row user_result">
                <div className="col-sm-4 user_element">
                    {/* Not sure how to implement retrieving profile picture*/}
                    { user.profile_img }
                    {/* filler picture*/}
                </div>
                <div className="col-sm-4 user_element">
                    { user.username }
                </div>
                <div className="col-sm-4 user_element">     
                    {/* replace this with the actual follow button*/}
                    <button className="follow_button" name="follow_link"
                            onClick={ () => this.redirectToUser(user) }>
                                Follow
                    </button>
                </div>
            </div>
        );

        return(
            <div style={{paddingTop: '20px', height:"65%"}}>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>
                    <div className="container">
                        { repoElement }
                    </div> 
            </div>
        );
    }
}

export default withRouter(UserSearchResults);