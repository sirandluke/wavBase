import React, {Component} from "react";
import db from "../../../Model/base";
import {findRepositories} from "../../../Model/FirebaseHandler";

export class RepositoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }

        const user_id = db.auth().currentUser.uid;
        findRepositories(user_id, (repos) => {
            this.setState({repos});
        })


        this.firebaseRef = db.database().ref('repositories');
        try {
            this.firebaseRef
                .orderByChild('user_id')
                .equalTo(user_id)
                .on('value', (dataSnapshot) => {
                    let repos = [];
                    console.log(dataSnapshot.val())
                    dataSnapshot.forEach(repoData => {
                        let repo = repoData.val();
                        console.log(repo)
                        console.log(repoData.key)
                        repos['.key'] = repoData.key;
                        repos.push(repo);
                        console.log(repos)
                    });
                    this.setState({repos})
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }


    render() {

        const repoElement = this.state.repos.map(repos =>
            <tr key={ repos.key }>
                <td style={ {width: '200px', textAlign: 'left'} }>{ repos.name }</td>
            </tr>
        );

        console.log("This state is:")
        console.log(this.state.repos);

        return (
            <div style={{paddingTop: '20px'}}>
                <table style={{border: '1px solid blue'}}>
                    <thead>
                    <tr>
                        <th style="text-align:left">Your Repositories</th>
                    </tr>
                    </thead>
                    <tbody>
                    {repoElement}
                    </tbody>
                </table>
            </div>
        );
    }
}