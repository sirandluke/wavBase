import React, {Component} from "react";

import db from "../../Model/base";

import {Link, withRouter} from "react-router-dom";

import "./RepositoryList.css";

class RepositoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }

        this.user_id = this.props.uid;
        console.log(this.user_id);

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

    redirectToRepo(curr_repo) {
        this.props.history.push({
            pathname: "/repository",
            state: {  // Pass as props for Repository page.
                repo: curr_repo
            }
        });
    }

    render() {

        const repoElement = this.state.repos.map(repos =>
            <tr key={ repos.repo_id }>
                <td style={ {width: '200px', textAlign: 'left'} }>
                    <button className="repo_button" name="repo_links"
                            onClick={ () => this.redirectToRepo(repos) }>
                        { repos.name }
                    </button>
                </td>
            </tr>
        );

        return (
            <div className="repo_list_div">
                {/* <table style={{border: '1px solid blue'}}> */}
                <table>
                    <tbody>
                        { repoElement }
                    </tbody>
                </table>
            </div>

        );
    }
}
export default withRouter(RepositoryList);