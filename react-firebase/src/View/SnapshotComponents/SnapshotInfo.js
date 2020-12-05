import React from 'react';
import {Component} from 'react';
import {useLocation} from "react-router";

export class SnapshotInfo extends Component {

    render() {
        return(
            <div>
                <h2>{this.props.username}/{this.props.repo_name}/{this.props.snapshot_desc}</h2>
                <h3>{this.props.datetime}</h3>
            </div>
        );
    }
}