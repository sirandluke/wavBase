import React, {Component, useEffect, useState} from "react";
import {FollowerCount} from "./FollowerCount"
import {NameBioFollowers} from "./NameBioFollowers";
import db from "../../Model/base";
import loading from "../../Images/loader.gif"

import "./ProfileInfo.css"
import {useHistory, useParams} from "react-router";
import {FindRepos, GetProfileImageUrl, GetUserRef, UpdateFollow} from "../../BackendFunctions";
import {AddId, DeleteId, IncludeId} from "../GlobalComponent/ParseId";


export function ProfileInfo(props) {
    const uid = props.uid;
    const current_uid = db.auth().currentUser.uid;

    const history = useHistory();
    const [user, setUser] = useState(props.user || []);

    useEffect(() => {
        //if (localStorage.getItem('repo_page_id') !== uid) {
        console.log('listen to user info');
        if (!props.user) {
            GetUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
                /*let profile_username = document.getElementById(uid + 'display_username');
                if (profile_username != null) {
                    profile_username.innerText = user_snapshot.username;
                }*/
                let image_path = "defaults/test_user.png";
                if (user_snapshot.profile_picture !== '') {
                    image_path = user_snapshot.profile_picture;
                }
                let image_url;
                if (localStorage.getItem(image_path)) {
                    image_url = localStorage.getItem(image_path);
                } else {
                    GetProfileImageUrl(image_path).then(url => {
                        url.map((link, key) => {
                            image_url = link;
                        })
                        localStorage.setItem(image_path, image_url);
                    });
                }
                //console.log(image_url);
                let img2 = document.getElementById(uid + 'profile_picture');
                if (img2 != null) {
                    img2.src = image_url;
                }
            })
        }

        //localStorage.setItem('repo_page_id', uid);
        //}
        return () => {
            console.log('stop listen to repository');
        }

    }, [props.repos, props.user, useParams()]);

    //console.log('profileinfo', user.username);
    const handleFollow = () => {
        UpdateFollow(uid, current_uid, 'follow');
        let tmp_user = user;
        let tmp_followers = AddId(tmp_user.followers, current_uid);
        tmp_user = {...tmp_user, followers: tmp_followers};
        localStorage.setItem('following', AddId(localStorage.getItem('following'), uid));
        setUser(tmp_user);
    }

    const handleUnfollow = () => {
        UpdateFollow(uid, current_uid, 'unfollow');
        let tmp_user = user;
        let tmp_followers = DeleteId(tmp_user.followers, current_uid);
        tmp_user = {...tmp_user, followers: tmp_followers}
        localStorage.setItem('following', DeleteId(localStorage.getItem('following'), uid));
        setUser(tmp_user);
    }

    return (
        <div id="ProfileInfoContainer">
            <img className="user_profile_picture" id={uid + "profile_picture"} src={loading} alt="Profile Picture"/>
            {((uid !== current_uid) && (!IncludeId(user.followers, current_uid))) ?
                <button onClick={handleFollow}>Follow</button> : <></>}
            {((uid !== current_uid) && (IncludeId(user.followers, current_uid))) ?
                <button onClick={handleUnfollow}>Unfollow</button> : <></>}
            <NameBioFollowers
                uid={uid}
                username={user.username}
                biography={user.biography}
                followers={user.followers}
                following={user.following}
            />

        </div>
    );
}

/*
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

        let uid;
        if (this.props.uid === null) {
            uid = db.auth().currentUser.uid;
        } else {
            uid = this.props.uid;
        }

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
            <div id="ProfileInfoContainer">
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
}*/
