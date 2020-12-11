import React, {useEffect, useState, useHistory} from "react";
import {Link, useParams} from "react-router-dom";
import {FindUsers, GetUserRef} from "../../BackendFunctions";
import {IncludeId} from "../GlobalComponent/ParseId";
import UserDisplayComponent from "../SearchResultsComponents/UserDisplayComponent";

function FollowersPopUp(props) {


    const [users, setUsers] = useState(0);
    const [current_user, setCurrentUser] = useState(0);
    //const {uid} = useParams();
    const uid = props.id;
    //console.log('popup',uid);


    useEffect(() => {
        console.log('listen to user list and user');
        if (!current_user) {
            GetUserRef(uid).then(user_snapshot => {
                setCurrentUser(user_snapshot);
            })
        }
        if (!users) {
            FindUsers(uid).then(users_snapshot => {
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
    }, [current_user, users, props.id]);


    return (
        <div>
            <h2>{current_user.username}'s followers</h2>
            {users && users.map((user, key) => (
                (IncludeId(current_user.followers, user.key)) ?
                    <UserDisplayComponent id={key} uid={user.key} username={user.username}/> : <></>
            ))}
        </div>
    );
}

export default FollowersPopUp;