import React, {useEffect, useState} from "react";
import db from "../../Database_config";
import {AddId, DeleteId, getIdCount, IncludeId} from "../../components/ParseId";
import {Link} from "react-router-dom";

function UserDisplayComponent(props) {
    const username = props.username;
    const uid = props.uid;
    //console.log(username + ' + ' + uid);
    const current_uid = db.auth().currentUser.uid;

    const [user, setUser] = useState(props.user || []);

    const getUserRef = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_info?current_uid=' + uid, config)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    const updateFollow = (uid, current_uid, type) => {
        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                uid, current_uid, type
            })
        };
        fetch('http://localhost:8000/user_info/follow?uid=' + uid, config)
            .catch(error => console.log(error));
    }

    useEffect(() => {
        console.log('listen to user status');
        if (!props.user) {
            getUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
                let picture = "defaults/test_user.png";
                if (user_snapshot.profile_picture !== '') {
                    picture = user_snapshot.profile_picture;
                }
                let image_url;
                if (localStorage.getItem(picture)) {
                    image_url = localStorage.getItem(picture);
                } else {
                    db.storage().ref().child(picture).getDownloadURL().then(function (url) {
                        image_url = url;
                        localStorage.setItem(picture, url);
                    });
                }
                let img2 = document.getElementById(uid + 'user_avatar');
                if (img2 != null) {
                    img2.src = image_url;
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
        updateFollow(uid, current_uid, 'follow');
        let tmp_user = user;
        tmp_user = {...tmp_user, followers: AddId(tmp_user.followers, current_uid)}
        localStorage.setItem('following', AddId(localStorage.getItem('following'), uid));
        if (document.getElementById(current_uid + 'following')) {
            document.getElementById(current_uid + 'following').innerText = getIdCount(localStorage.getItem('following')) + ' following';
        }
        setUser(tmp_user);
    }

    const handleUnfollow = () => {
        updateFollow(uid, current_uid, 'unfollow');
        let tmp_user = user;
        tmp_user = {...tmp_user, followers: DeleteId(tmp_user.followers, current_uid)}
        localStorage.setItem('following', DeleteId(localStorage.getItem('following'), uid));
        if (document.getElementById(current_uid + 'following')) {
            document.getElementById(current_uid + 'following').innerText = getIdCount(localStorage.getItem('following')) + ' following';
        }
        setUser(tmp_user);
    }

    return (
        <div>
            <ul>
                <img id={uid + 'user_avatar'} width={30} height={30}/>
                <p id={'user_username'}><Link to={'/user/' + uid}>{username}</Link></p>
                {((uid !== current_uid) && (!IncludeId(user.followers, current_uid))) ?
                    <button onClick={handleFollow}>Follow</button> : <></>}
                {((uid !== current_uid) && (IncludeId(user.followers, current_uid))) ?
                    <button onClick={handleUnfollow}>Unfollow</button> : <></>}
            </ul>
        </div>
    );
}

export default UserDisplayComponent;