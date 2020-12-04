import '../../App.css';
import React, { Component } from 'react';
import db from "../../Model/base";
import * as K from "../../Constants";

export class FollowButton extends Component {
    follow = () => {}

    unfollow = () => {}

    render() {
        return(
            <button type="button">Follow</button>
        );
    }
}
    