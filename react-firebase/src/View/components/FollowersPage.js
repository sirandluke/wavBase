import React, {useEffect, useState, useHistory} from "react";
import {Link, useParams} from "react-router-dom";
import {IncludeId} from "../../components/ParseId";

function FollowersPage(props) {

    const [users, setUsers] = useState(0);
    const [current_user, setUser] = useState(0);
    const {uid} = useParams();

    const getUserRef = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_info?current_uid=' + uid, config)
            .then(response => response.json())
            .catch(error => console.log("Home page " + error));
    }

    const findUsers = (uid) => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_list?' + uid, config)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    useEffect(() => {
        console.log('listen to user list and user');
        if (!current_user) {
            getUserRef(uid).then(user_snapshot => {
                setUser(user_snapshot);
            })
        }
        if (!users) {
            findUsers(uid).then(users_snapshot => {
                let users_list = [];
                for (let user in users_snapshot) {
                    //console.log(1);
                    users_list.push({...users_snapshot[user], key: user});
                }
                setUsers(users_list);
            });
        }
        return () => {
            console.log('stop listen to user list and user');
        }
    }, [current_user, users]);


    return (
        <div>
            <h2>{current_user.username}'s followers</h2>
            {users && users.map((user, key) => (
                (IncludeId(current_user.followers, user.key)) ?
                    <button id={key}><Link to={'/user/' + user.key}>{user.username}</Link></button> : <></>
            ))}
        </div>
    );
}

export default FollowersPage;