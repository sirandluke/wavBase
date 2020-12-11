import React from 'react';
import {Component} from 'react';
import {useLocation} from "react-router";
import './SnapshotInfo.css';

export class SnapshotInfo extends Component {

    render() {
        return(
            <div className="snapshot_info">
                <h2>{this.props.username}/{this.props.repo_name}/{this.props.snapshot_desc}</h2>
                <h3>{this.props.datetime}</h3>
            </div>
        );
    }
}