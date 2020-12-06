import React, {useEffect, useState} from "react";
import db from "../../Database_config";

function UserSearchResult(props) {

    let search_input = document.getElementById('search_input').value;
    const [users, setUsers] = useState(0);

    const uid = db.auth().currentUser.uid;

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
        console.log('executing');
        if (!users) {
            findUsers().then(users_snapshot => {
                let users_list = [];
                for (let user in users_snapshot) {
                    //console.log(1);
                    users_list.push({...users_snapshot[user], key: user});
                }
                setUsers(users_list);
            });
        }
    }, [users]);

    /*{users && users.map((user, key) => (
        (user.val().username.toLowerCase().includes(search_input.toLowerCase())) ? <button>{user.val().username}</button> : <></>
    ))}*/

    return (
        <div>
            <h2>User Search Result</h2>
            {users && users.map((user, key) => (
                (user.username.toLowerCase().includes(search_input.toLowerCase())) ?
                    <button id={key}>{user.username}</button> : <></>
            ))}
        </div>
    );
}

export default UserSearchResult;