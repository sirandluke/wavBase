import {Button} from "react-bootstrap";
import React from "react";
import {HashRouter, NavLink} from "react-router-dom";

export class RepoDisplayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.name = this.props.name;
    }

    render() {
        return (
            <div>
                <Button><NavLink to={'/' + this.id}>{this.name}</NavLink></Button>
            </div>
        );
    }
}