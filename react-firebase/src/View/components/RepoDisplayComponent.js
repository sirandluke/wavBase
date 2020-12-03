import {Button} from "react-bootstrap";
import React from "react";
import {HashRouter, NavLink} from "react-router-dom";

export class RepoDisplayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.uid = this.props.uid;
        this.name = this.props.name;
    }

    render() {
        return (
            <div>
                <Button><NavLink to={'/' + this.uid}>{this.name}</NavLink></Button>
            </div>
        );
    }
}