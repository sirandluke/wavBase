import React, {Component, useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import db from '../../Model/base';
import {Link, withRouter} from "react-router-dom";

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
            <tr key={ user.uid }>
                <td style={ {width: '200px', textAlign: 'left'} }>
                    {/* Not sure how to implement retrieving profile picture*/}
                    { user.profile_picture }
                    {/* filler picture*/}
                    <img src="../../Images/wavBase_logo.png"></img>
                </td>
                <td style={ {width: '200px', textAlign: 'left'} }>
                    { user.username }
                </td>
                <td style={ {width: '200px', textAlign: 'left'} }>     
                    {/* replace this with the actual follow button*/}
                    <button className="follow_button" name="follow_link"
                            onClick={ () => this.redirectToUser(user) }>
                                Follow
                    </button>
                </td>
            </tr>
        );

        return(
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

export default withRouter(UserSearchResults);