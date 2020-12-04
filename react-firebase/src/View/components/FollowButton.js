import '../../App.css';
import React, { Component, useState } from 'react';
import db from "../../Model/base";
import * as K from "../../Constants";
import * as FirebaseHandler from  "../../Model/FirebaseHandler.js";
import { Button } from 'react-bootstrap';

export class FollowButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isFollowing: false, buttonText: "" }
        this.user = db.auth().currentUser.uid;

        // Checks if current user is already following
        FirebaseHandler.isFollowing(this.props.uid, this.user, (data) => {
            // Callback sets the initial state of follow button
            if (data === true) {
                this.setState({ isFollowing: true, buttonText: "Unfollow" });
            } else {
                this.setState({ isFollowing: false, buttonText: "Follow" });
            }
        });
    }

    // Adds current user to follower list in database
    follow() {
        FirebaseHandler.addFollower(this.props.uid, this.user);
        this.setState({ isFollowing: true, buttonText: "Unfollow" });
    }

    // Removes current user from follower list in database
    unfollow() {
        FirebaseHandler.removeFollower(this.props.uid, this.user);
        this.setState({ isFollowing: false, buttonText: "Follow" });
    }

    // Calls follow or unfollow functions based on state of component
    fButton = () => this.state.isFollowing ? this.unfollow() : this.follow();

    render() {
        return(
            <Button onClick={this.fButton}>{this.state.buttonText}</Button>
        );
    }
}
    