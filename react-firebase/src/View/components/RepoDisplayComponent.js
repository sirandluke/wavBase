import {Button} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

export class RepoDisplayComponent extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.name = this.props.name;
    }

    render() {
        return (
            <div>
                <Button><Link to={'/repo/' + this.id}>{this.name}</Link></Button>
            </div>
        );
    }
}