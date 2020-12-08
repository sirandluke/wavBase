import React, {Component, useEffect, useState} from "react";

import db from "../../Model/TODELETE_base";

import {Link, withRouter} from "react-router-dom";

import "./RepositoryList.css";
import {useHistory, useParams} from "react-router";
import {ProfileInfo} from "./ProfileInfo";
import {findRepos, getProfileImageUrl, getUserRef} from "../../BackendFunctions";

function RepositoryList(props) {
    const history = useHistory();
    const [repos, setRepos] = useState(props.repos || []);

    const {user_id} = useParams();

    let current_uid = db.auth().currentUser.uid;
    let uid = current_uid;
    if (user_id != null) {
        uid = user_id;
    }
    console.log('Entering', uid + "'s repo page");

    useEffect(() => {
        console.log('listen to repository');
        if (!props.repos) {
            findRepos(uid)
                .then(repos_snapshot => {
                    let repos_list = [];
                    for (let repo in repos_snapshot) {
                        repos_list.push({...repos_snapshot[repo], key: repo});
                    }
                    setRepos(repos_list);
                });
        }
        return () => {
            console.log('stop listen to repository');
        }

    }, [props.repos, props.user, useParams()]);

    const redirectToRepo = (repo_id) => {
        history.push('/repo/' + repo_id);
    }

    let repoElement = [];
    if (repos) {
        repoElement = repos.map((repo, key) => (
            (repo.user_id === uid) && ((uid === current_uid) || (repo.is_private !== 'T' && uid !== current_uid)) ?
                <tr key={ repo.repo_id }>
                    <td style={ {width: '200px', textAlign: 'left'} }>
                        <button className="repo_button" name="repo_links"
                                onClick={ () => redirectToRepo(repo.key) }>
                            { repo.name }
                        </button>
                    </td>
                </tr> : <></>
        ))
    }

    return(
        <div>
            <ProfileInfo uid={uid}/>
            <div className="repo_list_div">
                {/* <table style={{border: '1px solid blue'}}> */}
                <table>
                    <tbody>
                    { repoElement }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default RepositoryList;

/*class RepositoryList extends Component {
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

        );
    }
}*/