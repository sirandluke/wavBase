import React, {Component} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import db from "../../Model/base";
import { withRouter } from "react-router-dom";

import folder_icon from "../../Images/folder@3x.png"


class SnapshotList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snapshots: []
        }

        this.fireBaseRef = db.database().ref('snapshots')
    }

    componentDidMount() {
        try {
            this.firebaseRef
                .orderByChild('snapshots')
                .equalTo(this.props.repo_id)
                .once('value', (dataSnapshot) => {
                    let snapshots = [];
                    dataSnapshot.forEach(snapData => {
                        let snapshot = snapData.val();
                        snapshots['snap_id'] = snapData.key;
                        snapshot.push(snapshot);
                    });
                    this.setState({snapshots: snapshots});
                }).then(() => {
                console.log(this.state.snapshots)
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    redirectToSnapshots(snapshot) { // Passes the snapshot object over to be viewed.

    }

    render() {

        // TODO: Map snapshot elements to SnapshotObject
        // Element displays folder icon + desc + datetime


        const snapshotElement = this.state.snapshots.map(snapshot =>
            <tr key={ snapshot.snap_id }>
                <td style={ {width: '200px', textAlign: 'left'} }>
                    <button className="snapshot_button" name="snapshot_links"
                            onClick={ () => this.redirectToSnapshots(snapshot) }>
                        { folder_icon }
                        { snapshot.description }
                        { snapshot.datetime }
                    </button>
                </td>
            </tr>
        );


        return(
            <div>
                {snapshotElement}
            </div>
        );
    }
}

export default withRouter(SnapshotList);