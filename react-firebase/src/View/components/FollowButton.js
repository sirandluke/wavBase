import '../../App.css';
import React, { Component, useState } from 'react';
import db from "../../Model/base";
import * as K from "../../Constants";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import { Button } from 'react-bootstrap';

// TODO: When user is already following, the text should be "Unfollow" by default
export class FollowButton extends Component {
    constructor(props) {
        super(props);
        this.following = false;
    }

    follow() {
        var user = db.auth().currentUser.uid;
        FirebaseHandler.addFollower("b1CeFr3r9Ma7azib7yB9qSL0hmI3", user);
        this.following = true;
    }

    unfollow() {
        var user = db.auth().currentUser.uid;
        FirebaseHandler.removeFollower("b1CeFr3r9Ma7azib7yB9qSL0hmI3", user);
        this.following = false;
    }

    fButton = () => this.following ? this.unfollow() : this.follow();

    render() {
        return(
            <Button onClick={this.fButton}>FOLLOW</Button>
        );
    }
}
    