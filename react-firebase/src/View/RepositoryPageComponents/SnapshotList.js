import React, {Component, useEffect, useState} from "react";

import db from "../../Model/TODELETE_base";
import {Route, useHistory, useParams, useRouteMatch, withRouter} from "react-router-dom";

import folder_icon from "../../Images/folder.png";
import "./SnapshotList.css"
import {GetSnapshotListByRepoId} from "../../BackendFunctions";

export function SnapshotList(props) {

    const history = useHistory();
    const {repo_id} = useParams();
    const [snapshot_list, setSnapshotList] = useState(0);

    useEffect(() => {
        console.log('Listening to snapshot list of repo_id:', repo_id);
        if (!snapshot_list) {
            GetSnapshotListByRepoId(repo_id).then(snapshot_list_snapshot => {
                let tmp_list = [];
                for (let snapshot in snapshot_list_snapshot) {
                    tmp_list.push({...snapshot_list_snapshot[snapshot], snap_id: snapshot});
                }
                setSnapshotList(tmp_list);
            })
        }
        return () => {
            console.log('Stop listening to snapshot list of repo_id:', repo_id);
        }
    }, [snapshot_list])
    // TODO: Map snapshot elements to SnapshotObject
    // Element displays folder icon + desc + datetime

    function redirectToSnapshots(curr_snapshot) { // Passes the snapshot object over to be viewed.
        history.push({
            pathname: `/snapshot/${curr_snapshot.snap_id}`,
        });
    }

    let snapshotElement = [];
    if (snapshot_list) {
        snapshotElement = snapshot_list.map((snapshot, key) =>
            <tr key={snapshot.snap_id}>
                <td style={{width: '500px', textAlign: 'left'}}>
                    <button className="snapshot_button" name="snapshot_links"
                            onClick={() => redirectToSnapshots(snapshot)}>
                        <img className="snaps_ico_1" src={folder_icon} alt="snapshot_icon"/>
                        {snapshot.description}
                        {snapshot.upload_date}
                    </button>
                </td>
            </tr>
        );
    }


    return (
        <div>
            <table className="snapshot_table">
                <tbody className="snapshot_body">
                {snapshotElement}
                </tbody>
            </table>
        </div>
    );

}


/*
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
                .on('value', (dataSnapshot) => {
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
                       <img className="snaps_ico_1" src={ folder_icon } alt="snapshot_icon"/>
                        { snapshot.description }
                        { snapshot.datetime }
                    </button>
                </td>
            </tr>
        );

        return(
            <div>
                <table className="snapshot_table">
                    <tbody className="snapshot_body">
                        {snapshotElement}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(SnapshotList);*/
