import React, {useEffect, useState} from "react";
import {search_input} from "./PersonalHome";
import {RepoDisplayComponent} from "../components/RepoDisplayComponent";

function UserSearchResult(props) {
    const [users, setUsers] = useState(props.users || []);

    const findUsers = () => {
        let config = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        return fetch('http://localhost:8000/user_list', config)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (!props.users) {
            findUsers().then(users_snapshot => {
                let users_list = [];
                for (let user in users_list) {
                    users_list.push({...users_snapshot[user], key: user});
                }
                setUsers(users_list);
            });
        }
    });

    return (
        <div>
            <h2>User Search Result</h2>
            <ul>
                {users && users.map((user, key) => (
                    (user.val().username.toLowerCase().includes(search_input.toLowerCase())) ? <button>{user.val().username}</button> : <></>
                ))}
            </ul>
        </div>
    );
}

export default UserSearchResult;