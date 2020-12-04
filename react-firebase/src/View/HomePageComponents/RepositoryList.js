import React, {Component} from "react";
import db from "../../Model/base";
import {Link, withRouter} from "react-router-dom";
import {findRepositories} from "../../Model/FirebaseHandler";
import "./RepositoryList.css";
import { useHistory } from "react-router-dom"

class RepositoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }

        this.user_id = db.auth().currentUser.uid;

        this.firebaseRef = db.database().ref('repositories');
    }

    componentDidMount() {
        // TODO: NEED TO MOVE TO BACK END

        try {
            this.firebaseRef
                .orderByChild('user_id')
                .equalTo(this.user_id)
                .once('value', (dataSnapshot) => {
                    let repos = [];
                    dataSnapshot.forEach(repoData => {
                        let repo = repoData.val();
                        repo['repo_id'] = repoData.key;
                        repos.push(repo);
                    });
                    this.setState({repos: repos});
                }).then(() => {
                console.log(this.state.repos)
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    redirectToRepo(repo_id, user_id) {
        console.log("Navigating to " + repo_id);
        this.props.history.push({
            pathname: "/repository",
            state: {  // Pass as props for Repository page.
                repo_id: repo_id,
                user_id: user_id
            }
        });
    }

    render() {

        const repoElement = this.state.repos.map(repos =>
            <tr key={ repos.repo_id }>
                <td style={ {width: '200px', textAlign: 'left'} }>
                    <button className="repo_button" name="repo_links"
                            onClick={ () => this.redirectToRepo(repos.repo_id, repos.user_id) }>
                        { repos.name }
                    </button>
                </td>
            </tr>
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
export default withRouter(RepositoryList);