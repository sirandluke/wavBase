import React, {Component} from "react";
import {FollowerCount} from "./FollowerCount"
import {UsernameBio} from "./UsernameBio";
import db from "../../Model/base";


export class ProfileInfo extends Component {
    constructor(props) {
        super(props);

        let uid = db.auth().currentUser.uid;
        this.firebaseRef = db.database().ref('users/' + uid);
        this.storageRef = db.storage().ref();
        this.firebaseRef.on('value', (snapshot) =>{
            const data = snapshot.val();
            this.state = {
                username: data.username,
                biography: data.biography,
                followers: data.followers,
                following: data.following,
                profile_picture_path: data.profile_picture,
                profile_picture_img: ''
            };
        })

        this.storageRef.child(this.state.profile_picture_path).getDownloadURL().then(function (url) {
            document.getElementById('profile_picture').src = url;
        }).catch(function (error) {
            console.log(error)
        });
    };

    render() {

        return (
            <div>
                <h1>Profile</h1>
                <img id="profile_picture" src="profile_picture" alt="Profile Picture" width="50" height="50"/>
                <FollowerCount
                    followers={this.state.followers}
                    following={this.state.following} />
                <UsernameBio username={this.state.username} biography={this.state.biography}/>
            </div>
        );
    }
}