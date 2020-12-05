import React, {Component} from "react";

import db from "../../Model/base";
import { withRouter } from "react-router-dom";

import folder_icon from "../../Images/folder.png";
import "./SnapshotList.css"

class SnapshotList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snapshots: []
        }

        this.fireBaseRef = db.database().ref('snapshots');
    }

    componentDidMount() {
        try {
            console.log(this.props.repo_id);
            db.database().ref('snapshots')
                .orderByChild('repo_id')
                .equalTo(this.props.repo_id)
                .once('value', (dataSnapshot) => {
                    let snapshots = [];
                    console.log('here')
                    dataSnapshot.forEach(snapData => {
                        let snapshot = snapData.val();
                        snapshot['snap_id'] = snapData.key;
                        snapshots.push(snapshot);
                    });
                    this.setState({snapshots: snapshots});
                }).then(() => {
                console.log(this.state.snapshots)
            });
        } catch (error) {
            console.log(error);
        }
    }

    redirectToSnapshots(curr_snapshot) { // Passes the snapshot object over to be viewed.
        this.props.history.push({
            pathname: "/snapshot",
            state: {  // Pass as props for Repository page.
                snapshot: curr_snapshot,
                repo_name: this.props.repo_name,
                username: "User"
            }
        });
    }

    render() {

        // TODO: Map snapshot elements to SnapshotObject
        // Element displays folder icon + desc + datetime

        const snapshotElement = this.state.snapshots.map(snapshot =>
            <tr key={ snapshot.snap_id }>
                <td style={ {width: '500px', textAlign: 'left'} }>
                    <button className="snapshot_button" name="snapshot_links"
                            onClick={ () => this.redirectToSnapshots(snapshot) }>
                       <img className="snaps_ico" src={ folder_icon } alt="snapshot_icon" height="20" width="20"/>
                        { snapshot.description }
                        { snapshot.datetime }
                    </button>
                </td>
            </tr>
        );

        return(
            <div>
                <h3>Snapshots</h3>
                <table>
                    <thead>

                    </thead>
                    <tbody>
                        {snapshotElement}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(SnapshotList);