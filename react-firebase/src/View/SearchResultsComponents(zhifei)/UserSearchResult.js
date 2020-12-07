import React, {useEffect, useState, useHistory} from "react";
import db from "../../Model/base";
import {Link} from "react-router-dom";
import UserDisplayComponent from "./UserDisplayComponent";

function UserSearchResult(props) {

    let search_input = document.getElementById('search_input').value;
    const [users, setUsers] = useState([]);

    const uid = db.auth().currentUser.uid;

    const findUsers = (uid) => {
        const repo_ref = db.database().ref().child('users');
        return repo_ref.once('value')
            .then(snapshot => snapshot.val())
            .catch(error => console.log(error));
    }

    useEffect(() => {
        console.log('listen to user list');
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
            console.log('stop listen to user list');
        }
    }, [users]);

    /*{users && users.map((user, key) => (
        (user.val().username.toLowerCase().includes(search_input.toLowerCase())) ? <button>{user.val().username}</button> : <></>
    ))}*/

    //<button id={key}><Link to={'/user/' + user.key}>{user.username}</Link></button>
    return (
        <div>
            <h2>User Search Result</h2>
            {users && users.map((user, key) => (
                (user.username.toLowerCase().includes(search_input.toLowerCase()) && (user.key !== uid)) ?
                    <UserDisplayComponent id={key} uid={user.key} username={user.username}/> : <></>
            ))}
        </div>
    );
}

export default UserSearchResult;