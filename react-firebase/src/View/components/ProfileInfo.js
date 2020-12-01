import React, {Component} from "react";
import {FollowerCount} from "./FollowerCount"
import {UsernameBio} from "./UsernameBio";
import {loading_gif, logo_path} from "../../Constants";
import db from "../../Model/base";
import loading from "../../Images/loader.gif"

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

        let that = this;
        this.readUserInfo().then( () => {
            that.renderProfilePicture().then((pfp) => {
                document.getElementById('profile_picture').src = pfp;
                this.setState({profile_picture_path: pfp})
            });
        });
    };

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    async readUserInfo() {
        await this.firebaseRef.on('value', async (snapshot) => {
            const data =  await snapshot.val();
            await this.setState({
                username: data.username,
                biography: data.biography,
                followers: data.followers,
                following: data.following,
                profile_picture_path: data.profile_picture
            });
        });
    }

    async renderProfilePicture() {
        let pfp = this.state.profile_picture_path;
        await this.storageRef.child(this.state.profile_picture_path).getDownloadURL().then( function (url) {
            pfp = url;
        }).catch(function (error) {
            console.log(error)
        });
        return pfp;
    }

    render() {

        return (
            <div>
                <h1>Profile</h1>
                <img id="profile_picture" src={loading} alt="Profile Picture" width="50" height="50"/>
                <FollowerCount
                    followers={this.state.followers}
                    following={this.state.following} />
                <UsernameBio username={this.state.username} biography={this.state.biography}/>
            </div>
        );
    }
}