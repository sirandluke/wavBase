import React, {Component} from "react";
import {FollowerCount} from "./FollowerCount"
import {NameBioFollowers} from "./NameBioFollowers";
import db from "../../Model/base";
import loading from "../../Images/loader.gif"

import "./ProfileInfo.css"

export class ProfileInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            biography: '',
            followers: '',
            following: '',
            profile_picture_path: loading
        };

        let uid = db.auth().currentUser.uid;
        this.firebaseRef = db.database().ref('users/' + uid);
        this.storageRef = db.storage().ref();
    };

    componentDidMount() {
        // TODO: TRANSFER TO MODEL
        this.firebaseRef.once('value',(snapshot) => {
            const data = snapshot.val();
            console.log(data);
            this.setState({
                username: data.username,
                biography: data.biography,
                followers: data.followers,
                following: data.following,
                profile_picture_path: data.profile_picture
            });
        }).then(() => {
            console.log(this.state.profile_picture_path);
            this.storageRef.child(this.state.profile_picture_path).getDownloadURL().then( function (url) {
                console.log(url);
                let pfp = document.getElementById("profile_picture");
                pfp.src = url;
            }).catch( (error) => {
                console.log(error)
            });
        });
    }

    render() {
        return (
            <div>
                <img className="user_profile_picture" id="profile_picture" src={loading} alt="Profile Picture"/>
                <NameBioFollowers
                    username={this.state.username}
                    biography={this.state.biography}
                    followers={this.state.followers}
                    following={this.state.following}
                />
            </div>
        );
    }
}