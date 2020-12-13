import React from 'react';
import {Component} from 'react';
import {useHistory, useLocation, useParams} from "react-router";
import './SnapshotInfo.css';

function SnapshotInfo(props) {
    const history = useHistory();
    const {repo_id, snap_id} = useParams();

    function handleBack() {
        history.push('/repo/' + repo_id);
    }
    return(
        <div>
            <button style={{marginTop:'1rem'}} className="snapshot_buttons" onClick={handleBack}>Back to snapshot list</button>
            {/*<h2>{this.props.username}/{this.props.repo_name}/{this.props.snapshot_desc}</h2>*/}
            <h2>Snapshot: {props.snapshot_desc}</h2>
            <h3>{props.datetime}</h3>
        </div>
    );
}

export default SnapshotInfo;
/*
export class SnapshotInfo extends Component {

    render() {
        const history = useHistory();
        const {repo_id, snap_id} = useParams();

        function handleBack() {
            history.push('/repo/' + repo_id);
        }
        return(
            <div>
                <button onClick={handleBack}>Back to snapshot list</button>
                {/!*<h2>{this.props.username}/{this.props.repo_name}/{this.props.snapshot_desc}</h2>*!/}
                <h2>Snapshot {this.props.snapshot_desc}</h2>
                <h3>{this.props.datetime}</h3>
            </div>
        );
    }
}*/
