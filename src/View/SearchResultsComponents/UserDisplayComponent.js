import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AddId, DeleteId, getIdCount, IncludeId} from "../GlobalComponent/ParseId";
import {GetProfileImageUrl, GetUserRef, UpdateFollow} from "../../BackendFunctions";
//import db from "../../Database_config";
import db from "../../Model/base";
import "../SearchComponents/SearchResult.css";
import "../HomePageComponents/RepositoryList.css"

function UserDisplayComponent(props) {
    const username = props.username;
    const uid = props.uid;
    //console.log(username + ' + ' + uid);
    const current_uid = db.auth().currentUser.uid;

    const [user, setUser] = useState(props.user || []);

    useEffect(() => {
        console.log('listen to user status');
        if (!props.user) {
            GetUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
                let image_path = "defaults/test_user.png";
                if (user_snapshot.profile_picture !== '') {
                    image_path = user_snapshot.profile_picture;
                }
                let image_url;
                if (localStorage.getItem(image_path)) {
                    image_url = localStorage.getItem(image_path);
                    let img2 = document.getElementById(uid + 'profile_picture');
                    if (img2 != null) {
                        img2.src = image_url;
                    }
                } else {
                    GetProfileImageUrl(image_path).then(url => {
                        url.map((link, key) => {
                            image_url = link;
                        })
                        localStorage.setItem(image_path, image_url);
                        console.log(image_url);
                        let img2 = document.getElementById(uid + 'profile_picture');
                        if (img2 != null) {
                            img2.src = image_url;
                        }
                    });
                }
                /*db.storage().ref().child(picture).getDownloadURL().then(function (url) {
                    console.log(username + '\'s url is ' + url);
                    let img2 = document.getElementById(uid + 'user_avatar');
                    if (img2 != null) {
                        img2.src = url;
                    }
                });*/
            })
        }
        return () => {
            console.log('stop listen to user status');
        }
    }, [props.user]);

    const handleFollow = () => {
        UpdateFollow(uid, current_uid, 'follow');
        let tmp_user = user;
        tmp_user = {...tmp_user, followers: AddId(tmp_user.followers, current_uid)}
        localStorage.setItem('following', AddId(localStorage.getItem('following'), uid));
        if (document.getElementById(current_uid + 'following button')) {
            document.getElementById(current_uid + 'following button').innerText = getIdCount(localStorage.getItem('following')) + ' following';
        }
        setUser(tmp_user);
    }

    const handleUnfollow = () => {
        UpdateFollow(uid, current_uid, 'unfollow');
        let tmp_user = user;
        tmp_user = {...tmp_user, followers: DeleteId(tmp_user.followers, current_uid)}
        localStorage.setItem('following', DeleteId(localStorage.getItem('following'), uid));
        if (document.getElementById(current_uid + 'following button')) {
            document.getElementById(current_uid + 'following button').innerText = getIdCount(localStorage.getItem('following')) + ' following';
        }
        setUser(tmp_user);
    }

    return (
        <div>
            <ul className="userList" >
                <img id={uid + 'profile_picture'} className="profilePic"/>



                {((uid !== current_uid) && (!IncludeId(user.followers, current_uid))) ?
                    <button className="followBtn" onClick={handleFollow}>Follow</button> : <></>}

                {((uid !== current_uid) && (IncludeId(user.followers, current_uid))) ?
                    <button className="followBtn" onClick={handleUnfollow}>Unfollow</button> : <></>}

                {(uid === current_uid) ? <p id={uid + 'user_username'}><Link to={'/'}>{username}</Link></p> :
                    <p id={uid + 'user_username'}><Link to={'/user/' + uid} className="searchUsername">{username}</Link></p>}
            </ul>
            <hr/>
            <br/>
        </div>
    );
}

export default UserDisplayComponent;